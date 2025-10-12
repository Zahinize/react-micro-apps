import { useRef } from 'react';
import './tabs.css';

export default function Tabs({ data = [] }) {
  const tabsMarkerRef = useRef(null);
  const tabsRef = useRef(1);
  const tabsLength = data.length;
  const TAB_SIZE = 80;

  function updateTabsMarker(id) {
    let translateX = (id == 1) ? 0 : (id-1) * TAB_SIZE;
    tabsMarkerRef.current.style.transform = `translateX(${translateX}px)`;
    tabsRef.current = id;
  }

  function handleTabsClick(e) {
    const elId = e.target.id;
    const id = Number(elId.split("-")[2]);

    if (id == tabsRef.current) return;

    updateTabsMarker(id);
    for (let i = 1; i <= tabsLength; i++) {
      // Hide all tabs content first
      document.getElementById(`tab-content-${i}`).classList.add('d-none');
      // Make all tabs inactive first
      document.getElementById(`tab-title-${i}`).classList.remove('ui-active');
    }

    document.getElementById(`tab-title-${id}`).classList.add('ui-active');
    document.getElementById(`tab-content-${id}`).classList.remove('d-none');
  }

  function renderUI(data = []) {
    if (!data.length) return;

    const titleArr = data.map(({ title }, idx) => {
      const newId = idx + 1;
      return <div key={`tab-title-${newId}`} id={`tab-title-${newId}`} className='tabs-title t-center f-bold c-pointer'>{title}</div>;
    });
    const contentArr = data.map(({ content }, idx) => {
      const newId = idx + 1;
      const className = newId === 1 ? '' : 'd-none';
      return <div key={`tab-content-${newId}`} id={`tab-content-${newId}`} className={className}>{content}</div>;
    });

    return (
      <>
        <div className="tabs-header d-flex d-y-center mb-20" onClick={handleTabsClick}>
          {titleArr}
          <div ref={tabsMarkerRef} className="tabs-marker"></div>
        </div>
        <div className='tabs-content'>
          {contentArr}
        </div>
      </>
    );
  }

  return (
    <div className="tabs">
      {renderUI(data)}
    </div>
  );
}