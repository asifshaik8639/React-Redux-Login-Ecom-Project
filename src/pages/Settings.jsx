import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import '../assets/settings.css';

const Tab1Component = () => <div>Component for Tab 1</div>;
const Tab2Component = () => <div>Component for Tab 2</div>;
const Tab3Component = () => <div>Component for Tab 3</div>;

const componentMap = {
  Tab1: Tab1Component,
  Tab2: Tab2Component,
  Tab3: Tab3Component
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState(<Tab1Component/>);

  const handleTabClick = (event) => {
    event.preventDefault();
    const componentKey = event.currentTarget.name || 'Tab1';
    const ComponentToLoad = componentMap[componentKey];
    setActiveTab(<ComponentToLoad />);
  };

  console.log(`in lazy loading of settings component`);

  return (
    <div className='nav-bar-tabs-cls'>
        <nav>
          <ul>
            <li>
              <Link name="Tab1"  onClick={(e) => handleTabClick(e)}>
                Tab 1
              </Link>
            </li>
            <li>
              <Link  name="Tab2" onClick={(e) => handleTabClick(e)}>
                Tab 2
              </Link>
            </li>
            <li>
              <Link  name="Tab3" onClick={(e) => handleTabClick(e)}>
                Tab 3
              </Link>
            </li>
          </ul>
        </nav>

        {
          <div>
            {
              <>{activeTab}</>
            }
          </div>
        }

    </div>
  );
};

export default Settings;


