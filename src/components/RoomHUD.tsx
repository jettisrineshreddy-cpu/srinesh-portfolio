import React from 'react';
import { ROOM_STATIONS, type RoomStationId } from './three/RoomWorld';
import './RoomHUD.css';

interface RoomHUDProps {
  currentStation: RoomStationId;
  onSelectStation: (id: RoomStationId) => void;
  onExit3DMode: () => void;
}

export const RoomHUD: React.FC<RoomHUDProps> = ({
  currentStation,
  onSelectStation,
  onExit3DMode,
}) => {
  return (
    <div className="room-hud">
      {/* Top Telemetry Bar */}
      <header className="room-hud__top">
        <div className="room-hud__branding">
          <span className="room-hud__glitch-dot" />
          <span className="room-hud__brand-title">SRINESH // 3D LAB ENVIRONMENT</span>
          <span className="room-hud__badge">STATION: {currentStation.toUpperCase()}</span>
        </div>

        <button
          type="button"
          className="room-hud__exit-btn"
          onClick={onExit3DMode}
          aria-label="Switch back to Editorial Web View"
        >
          &times; EXIT 3D LAB (EDITORIAL VIEW)
        </button>
      </header>

      {/* Bottom Navigation Deck */}
      <footer className="room-hud__bottom">
        <div className="room-hud__stations-nav">
          {ROOM_STATIONS.map((station) => {
            const isActive = station.id === currentStation;
            return (
              <button
                key={station.id}
                type="button"
                className={`room-hud__station-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectStation(station.id)}
              >
                <span className="room-hud__station-dot" />
                <span className="room-hud__station-label">{station.label}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
