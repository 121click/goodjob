import React from 'react';
import { formatDate } from '../utils/helpers';

interface HeaderProps {
  date: string;
  isEditing: boolean;
  onToggleEdit: () => void;
}

const Header: React.FC<HeaderProps> = ({ date, isEditing, onToggleEdit }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📋 일일 계획표
            </h1>
            <p className="text-lg text-gray-600">
              {formatDate(date)}
            </p>
          </div>
          
          <button
            onClick={onToggleEdit}
            className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isEditing
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-primary-500 hover:bg-primary-600 text-white'
            }`}
          >
            {isEditing ? '✅ 완료' : '✏️ 편집'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;