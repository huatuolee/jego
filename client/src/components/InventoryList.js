import React, { useState, useRef, useEffect } from 'react';

const InventoryList = ({ inventory, updateInventory }) => {
  const [usageQuantity, setUsageQuantity] = useState({});
  const [showUsageInput, setShowUsageInput] = useState({});
  const [showAdditionalInfo, setShowAdditionalInfo] = useState({});
  const additionalInfoRef = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(showAdditionalInfo).forEach(id => {
        if (showAdditionalInfo[id] && additionalInfoRef.current[id] && !additionalInfoRef.current[id].contains(event.target)) {
          setShowAdditionalInfo(prev => ({ ...prev, [id]: false }));
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAdditionalInfo]);

  const handleUse = (id) => {
    setShowUsageInput(prev => ({ ...prev, [id]: true }));
  };

  const confirmUse = (id) => {
    if (usageQuantity[id]) {
      updateInventory(id, Number(usageQuantity[id]));
      setUsageQuantity(prev => ({ ...prev, [id]: '' }));
      setShowUsageInput(prev => ({ ...prev, [id]: false }));
    }
  };

  const cancelUse = (id) => {
    setUsageQuantity(prev => ({ ...prev, [id]: '' }));
    setShowUsageInput(prev => ({ ...prev, [id]: false }));
  };

  const toggleAdditionalInfo = (id) => {
    setShowAdditionalInfo(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getBackgroundColor = (quantity) => {
    if (quantity >= 10) return '#4caf50';
    if (quantity > 3) return '#ff9800';
    if (quantity > 1) return '#f44336';
    return '#d32f2f';
  };

  console.log('Inventory received in InventoryList:', inventory);

  return (
    <div className="inventory-list">
      <h2>현황판</h2>
      <div className="inventory-grid">
        {inventory.map((item) => (
          <div key={item.id} className="inventory-item">
            <div className="item-header">
              <div className="item-name">{item.material} - {item.type}</div>
              <div className="info-section">
                {showAdditionalInfo[item.id] && (
                  <div className="additional-info">
                    {item.additionalInfo || '추가 정보 없음'}
                  </div>
                )}
                <button 
                  className="info-button" 
                  onClick={() => toggleAdditionalInfo(item.id)}
                >
                  {showAdditionalInfo[item.id] ? '접기' : '상세정보'}
                </button>
              </div>
            </div>
            <div className="item-details">
              <div className="item-specs">
                <span className="item-thickness">{item.thickness}T</span>
                <span>{item.sizeHeight}x{item.sizeWidth}</span>
                <span className="item-quantity">수량: {item.quantity}</span>
              </div>
              <div className="usage-section">
                {showUsageInput[item.id] ? (
                  <div className="usage-input">
                    <input
                      type="number"
                      value={usageQuantity[item.id] || ''}
                      onChange={(e) => setUsageQuantity(prev => ({ ...prev, [item.id]: e.target.value }))}
                      placeholder="사용 수량"
                    />
                    <button onClick={() => confirmUse(item.id)}>확인</button>
                    <button onClick={() => cancelUse(item.id)}>취소</button>
                  </div>
                ) : (
                  <button onClick={() => handleUse(item.id)}>사용</button>
                )}
              </div>
            </div>
            {showAdditionalInfo[item.id] && (
              <div className="additional-info">
                {item.additionalInfo || '추가 정보 없음'}
              </div>
            )}
            <div 
              className="inventory-bar" 
              style={{
                width: `${Math.min(item.quantity * 10, 100)}%`,
                backgroundColor: getBackgroundColor(item.quantity)
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
