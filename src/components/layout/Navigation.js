import * as React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

import { ReactComponent as Diploma } from '../../assets/svg/diploma.svg';
import { ReactComponent as Chart } from '../../assets/svg/chart.svg';
import { ReactComponent as ChartPie } from '../../assets/svg/chart-pie.svg';
import { ReactComponent as Logo } from '../../assets/svg/logo.svg';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AllInboxOutlinedIcon from '@mui/icons-material/AllInboxOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

const Navigation = () => {
  const [value, setValue] = React.useState(3);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#266AEB',
        color: '#fff',
        width: '80px',
        height: '630px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '30px',
        paddingTop: '20px',
      }}
    >
      <Logo />
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        aria-label="nav tabs"
        sx={{ pt: '5' }}
        centered
      >
        <Tab
          icon={<BadgeOutlinedIcon fontSize="small" />}
          aria-label="id-badge"
          value={0}
          className={value === 0 ? 'selected' : ''}
        />
        <Tab
          icon={<GridViewOutlinedIcon fontSize="small" />}
          aria-label="dashboard"
          value={1}
          className={value === 1 ? 'selected' : ''}
        />

        <Tab
          icon={<CalculateOutlinedIcon fontSize="small" />}
          aria-label="calculator"
          value={2}
          className={value === 2 ? 'selected' : ''}
        />
        <Tab
          icon={
            <Diploma
              fill={value === 3 ? '#266AEB' : '#fff'}
              width="20"
              height="20"
            />
          }
          aria-label="invoice"
          value={3}
          className={value === 3 ? 'selected' : ''}
        />
        <Tab
          icon={<AllInboxOutlinedIcon fontSize="small" />}
          value={4}
          aria-label="inbox"
          className={value === 4 ? 'selected' : ''}
        />
        <Tab
          icon={
            <Chart
              width="20"
              height="20"
              fill={value === 5 ? '#266AEB' : '#fff'}
            />
          }
          value={5}
          aria-label="chart"
          className={value === 5 ? 'selected' : ''}
        />
        <Tab
          icon={
            <ChartPie
              width="20"
              height="20"
              fill={value === 6 ? '#266AEB' : '#fff'}
            />
          }
          value={6}
          aria-label="chart pie"
          className={value === 6 ? 'selected' : ''}
        />
        <Tab
          icon={<GppGoodOutlinedIcon fontSize="small" />}
          value={7}
          aria-label="shield field"
          className={value === 7 ? 'selected' : ''}
        />
        <Tab
          icon={<DateRangeOutlinedIcon fontSize="small" />}
          value={8}
          aria-label="calendar"
          className={value === 8 ? 'selected' : ''}
        />
        <Tab
          icon={<AccountBalanceOutlinedIcon fontSize="small" />}
          value={9}
          aria-label="bank"
          className={value === 9 ? 'selected' : ''}
        />
      </Tabs>
    </Box>
  );
};

export default Navigation;
