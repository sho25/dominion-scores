import React, { ReactNode, useState } from 'react';
import { Tab, Tabs } from '@mui/material';

import './TabMenu.scss';

type Props = {
  labels: string[];
  tabContent: ReactNode[];
  isFullWidth?: boolean;
};

function Content(props: { index: number; value: number; children: ReactNode }) {
  const { index, value, children } = props;
  return <div>{index === value ? children : null}</div>;
}

function TabMenu(props: Props) {
  const { labels, tabContent, isFullWidth } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant={isFullWidth ? 'fullWidth' : undefined}
      >
        {labels.map((label) => (
          <Tab label={label} />
        ))}
      </Tabs>
      <div className="container">
        {tabContent.map((content: ReactNode, index: number) => (
          <Content value={value} index={index}>
            {content}
          </Content>
        ))}
      </div>
    </div>
  );
}

export default TabMenu;
