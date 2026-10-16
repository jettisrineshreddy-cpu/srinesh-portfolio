import React, { useState } from 'react';
import './SqlPlayground.css';

interface QueryPreset {
  id: string;
  name: string;
  description: string;
  sql: string;
  columns: string[];
  rows: (string | number)[][];
  insight: string;
}

const PRESETS: Record<string, QueryPreset[]> = {
  'pubg-analytics': [
    {
      id: 'weapon-efficiency',
      name: 'Weapon Damage Efficiency & Win Rate',
      description: 'Calculates avg damage per hit, headshot ratio, and victory correlation using window rankings.',
      sql: `-- PUBG 4.4M Dataset Analysis
WITH WeaponStats AS (
    SELECT 
        weapon_type,
        COUNT(DISTINCT match_id) AS total_matches,
        ROUND(AVG(damage_dealt), 2) AS avg_damage,
        ROUND(SUM(headshot_kills) * 100.0 / NULLIF(SUM(kills), 0), 2) AS headshot_pct,
        ROUND(AVG(win_place_percentile) * 100, 1) AS win_rate_correl
    FROM pubg_match_analytics
    WHERE kills > 0
    GROUP BY weapon_type
)
SELECT 
    weapon_type,
    avg_damage,
    headshot_pct,
    win_rate_correl,
    DENSE_RANK() OVER (ORDER BY win_rate_correl DESC) AS rank
FROM WeaponStats
ORDER BY rank ASC;`,
      columns: ['Weapon Type', 'Avg Damage', 'Headshot %', 'Win Correlation', 'Rank'],
      rows: [
        ['Sniper Rifle (AWM / M24)', 284.5, '42.8%', '86.4%', '#1'],
        ['DMR (Mini14 / SLR)', 198.2, '31.4%', '78.2%', '#2'],
        ['Assault Rifle (M416 / Beryl)', 164.7, '22.6%', '71.5%', '#3'],
        ['SMG (Vector / UMP45)', 132.0, '14.2%', '58.9%', '#4'],
        ['Shotgun (DBS / S12K)', 155.8, '11.8%', '49.1%', '#5'],
      ],
      insight: 'High-caliber DMRs and Sniper Rifles display an 86.4% correlation with top-10 placements in late-circle phases.'
    },
    {
      id: 'survival-movement',
      name: 'Movement Distance vs. Survival Probability',
      description: 'Examines distance traveled on foot vs. vehicle usage across survival quartiles.',
      sql: `-- Movement Clustering by Placement Quartile
SELECT 
    CASE 
        WHEN win_place_percentile >= 0.75 THEN 'Top 25% (Survivors)'
        WHEN win_place_percentile >= 0.50 THEN '50% - 75% (Mid-Game)'
        ELSE 'Under 50% (Early Exit)'
    END AS tier,
    ROUND(AVG(ride_distance_meters), 0) AS avg_vehicle_m,
    ROUND(AVG(walk_distance_meters), 0) AS avg_walk_m,
    ROUND(AVG(heals_boosts_used), 1) AS avg_heals
FROM pubg_match_analytics
GROUP BY 
    CASE 
        WHEN win_place_percentile >= 0.75 THEN 'Top 25% (Survivors)'
        WHEN win_place_percentile >= 0.50 THEN '50% - 75% (Mid-Game)'
        ELSE 'Under 50% (Early Exit)'
    END
ORDER BY avg_walk_m DESC;`,
      columns: ['Placement Tier', 'Vehicle Dist (m)', 'Walk Dist (m)', 'Avg Heals / Boosts'],
      rows: [
        ['Top 25% (Survivors)', '2,840 m', '2,490 m', '5.8 items'],
        ['50% - 75% (Mid-Game)', '1,420 m', '1,680 m', '2.6 items'],
        ['Under 50% (Early Exit)', '480 m', '640 m', '0.7 items'],
      ],
      insight: 'Active rotation using combined vehicle transport and tactical foot repositioning triples survival duration.'
    }
  ],
  'medtrack-dv': [
    {
      id: 'bed-occupancy',
      name: 'Departmental Bed Utilization & ALOS',
      description: 'T-SQL aggregation modeling patient admission duration and bed turnover capacity.',
      sql: `-- Hospital Star Schema Operations
SELECT 
    dept.department_name,
    COUNT(adm.admission_id) AS total_admissions,
    ROUND(AVG(DATEDIFF(day, adm.admit_date, adm.discharge_date)), 1) AS avg_los_days,
    ROUND(COUNT(adm.admission_id) * 100.0 / dept.allocated_beds, 1) AS occupancy_rate_pct
FROM Dim_Department dept
LEFT JOIN Fact_Admissions adm ON dept.dept_id = adm.dept_id
WHERE adm.admit_date >= '2024-01-01'
GROUP BY dept.department_name, dept.allocated_beds
ORDER BY occupancy_rate_pct DESC;`,
      columns: ['Department', 'Admissions', 'Avg LOS (Days)', 'Occupancy %'],
      rows: [
        ['Critical Care / ICU', 840, '6.8 days', '94.2%'],
        ['Cardiology Ward', 1,420, '4.2 days', '88.5%'],
        ['Orthopedics & Trauma', 1,180, '5.1 days', '81.0%'],
        ['Pediatrics', 960, '3.2 days', '68.4%'],
      ],
      insight: 'ICU occupancy remains above 90%, triggering alerts for elective procedure scheduling reallocations.'
    }
  ],
  'hr-analytics': [
    {
      id: 'attrition-factors',
      name: 'Departmental Attrition Rate & Overtime Impact',
      description: 'Calculates attrition rates and correlates overtime frequency with voluntary separation percentages.',
      sql: `-- HR Attrition & Overtime Driver Analysis
SELECT 
    department,
    COUNT(employee_id) AS total_employees,
    SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) AS attrition_count,
    ROUND(SUM(CASE WHEN attrition = 'Yes' THEN 1 ELSE 0 END) * 100.0 / COUNT(employee_id), 1) AS attrition_rate_pct,
    ROUND(AVG(CASE WHEN overtime = 'Yes' THEN 1.0 ELSE 0.0 END) * 100, 1) AS overtime_pct
FROM hr_workforce_records
GROUP BY department
ORDER BY attrition_rate_pct DESC;`,
      columns: ['Department', 'Employees', 'Attrition Count', 'Attrition Rate', 'Overtime %'],
      rows: [
        ['Sales & Business Dev', 446, 92, '20.6%', '34.2%'],
        ['Human Resources', 63, 12, '19.0%', '28.5%'],
        ['Research & Development', 961, 133, '13.8%', '26.1%'],
      ],
      insight: 'Sales teams experiencing overtime exceed 20% attrition, identifying workload rebalancing as the primary retention lever.'
    }
  ]
};

interface SqlPlaygroundProps {
  projectId: string;
}

export const SqlPlayground: React.FC<SqlPlaygroundProps> = ({ projectId }) => {
  const presets = PRESETS[projectId];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasRun, setHasRun] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');

  if (!presets || presets.length === 0) return null;

  const current = presets[selectedIdx];

  const handleRun = () => {
    setIsExecuting(true);
    setHasRun(false);
    setTimeout(() => {
      setIsExecuting(false);
      setHasRun(true);
    }, 400);
  };

  return (
    <div className="sql-playground">
      <div className="sql-playground__header">
        <div className="sql-playground__title-wrap">
          <span className="sql-playground__badge">INTERACTIVE SQL CONSOLE</span>
          <h4 className="sql-playground__title">Query Engine &amp; Analytical Insights</h4>
        </div>

        {presets.length > 1 && (
          <div className="sql-playground__tabs">
            {presets.map((p, idx) => (
              <button
                key={p.id}
                className={`sql-playground__tab ${idx === selectedIdx ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedIdx(idx);
                  handleRun();
                }}
              >
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="sql-playground__editor">
        <div className="sql-playground__editor-bar">
          <span className="sql-playground__engine-label">T-SQL / SQL Server 2022</span>
          <button 
            className="sql-playground__run-btn" 
            onClick={handleRun}
            disabled={isExecuting}
          >
            {isExecuting ? 'EXECUTING...' : '▶ EXECUTE QUERY'}
          </button>
        </div>
        <pre className="sql-playground__code">
          <code>{current.sql}</code>
        </pre>
      </div>

      {hasRun && (
        <div className="sql-playground__results">
          <div className="sql-playground__results-bar">
            <span className="sql-playground__results-count">
              QUERY EXECUTED · {current.rows.length} ROWS RETURNED
            </span>
            <div className="sql-playground__results-controls">
              <span className="sql-playground__exec-time">Execution Time: 32ms</span>
              <div className="sql-playground__view-toggles">
                <button 
                  className={`sql-playground__toggle-btn ${viewMode === 'table' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('table')}
                >
                  TABLE
                </button>
                <button 
                  className={`sql-playground__toggle-btn ${viewMode === 'chart' ? 'is-active' : ''}`}
                  onClick={() => setViewMode('chart')}
                >
                  LIVE CHART
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="sql-playground__table-wrap">
              <table className="sql-playground__table">
                <thead>
                  <tr>
                    {current.columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.rows.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((val, cIdx) => (
                        <td key={cIdx}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="sql-playground__chart-wrap">
              <div className="sql-playground__chart-legend">
                <span>{current.columns[0]} vs {current.columns[1]}</span>
              </div>
              <div className="sql-playground__bars">
                {current.rows.map((row, idx) => {
                  const label = String(row[0]);
                  const rawVal = typeof row[1] === 'number' ? row[1] : parseFloat(String(row[1]).replace(/[^0-9.]/g, '')) || 50;
                  // Normalize value relative to max in rows
                  const maxVal = Math.max(...current.rows.map(r => typeof r[1] === 'number' ? r[1] : parseFloat(String(r[1]).replace(/[^0-9.]/g, '')) || 100));
                  const pct = Math.max(12, Math.min(100, (rawVal / (maxVal || 1)) * 100));

                  return (
                    <div key={idx} className="sql-playground__bar-row">
                      <span className="sql-playground__bar-label" title={label}>{label}</span>
                      <div className="sql-playground__bar-track">
                        <div 
                          className="sql-playground__bar-fill" 
                          style={{ width: `${pct}%` }}
                        >
                          <span className="sql-playground__bar-val">{String(row[1])}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="sql-playground__insight">
            <span className="sql-playground__insight-label">ANALYTICAL TAKEAWAY</span>
            <p className="sql-playground__insight-text">{current.insight}</p>
          </div>
        </div>
      )}
    </div>
  );
};
