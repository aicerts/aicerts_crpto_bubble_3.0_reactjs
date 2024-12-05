/* eslint-disable prettier/prettier */
import { Box, Stack, ClickAwayListener, Grow, Typography, TextField } from '@mui/material';
import { StyledTab, StyledTabs } from '../ui/overrides/Tabs';
import HeaderProgress from './HeaderProgress';
import useConfigStore from '../store/useConfigStore';
import useDataStore from '../store/useDataStore';
import Helper from '../utils/Helper';
import { useEffect, useRef, useState } from 'react';
import StyledIconButton from '../ui/overrides/IconButton';
import { Add, Edit, Search } from '@mui/icons-material';
import StyledTextField, { SearchTextField } from '../ui/overrides/TextField';
import Constant from '../utils/Constant';
import ConfigurationDialog from './layout/ConfigurationDialog';
import FooterTabs from './FooterTabs';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';

const HeaderTabs = () => {
  const config = useConfigStore((state) => state.configuration);
  const layout = useConfigStore((state) => state.layout);
  const updateConfig = useConfigStore((state) => state.setConfig);
  const currencies = useDataStore((state) => state.currencies);
  const [isMobile, setIsMobile] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const symbols = useDataStore((state) => state.currencies);
  const setSelectedCurrency = useDataStore((state) => state.setSelectedCurrency);
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);
  const anchorEl = useRef();
  const setEditConfig = useConfigStore((state) => state.setEditConfig);
  const allConfigs = useConfigStore((state) => state.allConfigs);
  const updateAllConfig = useConfigStore((state) => state.updateAllConfigs);
  const setConfig = useConfigStore((state) => state.setConfig);
  const [hasToken, setHasToken] = useState(false);
  const location = useLocation();
  const setLayout = useConfigStore((state) => state.setLayout);

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      const filter = symbols.filter(
        (item) => item.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredSymbols(filter);
    } else {
      setFilteredSymbols(symbols);
    }
  }, [searchTerm, symbols]);

  const handleClose = (currency) => {
    setSearchEnabled(false);
    setSearchTerm('');
    if (currency) {
      setSelectedCurrency(currency);
    }
  };
  useEffect(() => {
    const cleanup = Helper.handleResize(setIsMobile);

    return cleanup;
  }, []);

  const calculateVarient = (item) => {
    const weight = Helper.calculateConfigurationWeight(item, currencies);
    if (weight > 0) {
      return 'buy';
    }
    if (weight < 0) {
      return 'sell';
    }
    return 'neutral';
  };

  const handleAddConfig = () => {
    const item = { ...Constant.DEFAULT_CONFIGS[0] };
    item.period = 'min1';
    item.id = Date.now();
    allConfigs.push(item);
    updateAllConfig(allConfigs);
    setConfig(item);
    setEditConfig(true);
  };

  const handleLogout = () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const userEmail = queryParams.get('userEmail');
  
    // Remove query parameters from the URL
    if (token || userEmail) {
      const newUrl = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  
    // Clear tokens and user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
  
    // Update state or perform other actions
    setHasToken(false); // Update the state to reflect logout
  
    // Redirect to login or home page
    window.location.href ='/login';
  };
  

  return (
    <Stack direction="row" gap={isMobile ? 1 : 2}  bgcolor={'#171A24'} display={'flex'} justifyContent={"space-between"}  alignItems={'center'} padding={1.5}>
      <HeaderProgress />
      {/* {layout === 'bubble' && ( */}
        <>
          <img className="ml-2" src={searchEnabled ? './image2.png' : './image.png'} alt="Brand Image" style={{ height: 40 , cursor:"pointer"}} onClick={()=>{setLayout("bubble")}}  />

          <ClickAwayListener onClickAway={() => handleClose()}>
            <Box width={isMobile && searchEnabled ?"60%":"40%"} position="relative">
            {(isMobile && searchEnabled) || !isMobile ? (
                <SearchTextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                fullWidth
                ref={anchorEl}
                placeholder="Search..."
                InputProps={{
                  startAdornment: <Search sx={{ color: '#3D424B', mr: 1 }} />,
                  sx: { border: 'none', backgroundColor: '#2A2E36', boxShadow: 'none',  }
                }}
                sx={{
                  backgroundColor: '#2A2E36',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& input::placeholder': { textAlign: 'left' }, // Aligns placeholder left
                  '& .MuiInputBase-input': { 
                    color: 'white', 
                  
                    textAlign: 'left', 
                  },
            

                }}
              />

 
) : (
  isMobile && !searchEnabled && (
    <Box display={"flex"} gap={1} justifyContent={"flex-end"}>
     <StyledIconButton sx={{height:"100%"}} onClick={() => setSearchEnabled(true)}>
    <Search />
  </StyledIconButton>
   <StyledIconButton onClick={handleLogout}  sx={{ height: '100%', width:"40px", display:
    'flex', justifyContent:"center", alignItems:"center",
    
    }}>
    {/* <ExitToAppIcon /> */}
    <LogoutIcon/>
  
  </StyledIconButton>

    </Box>
   
   
  )
)}

              {/* <StyledTextField
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
                fullWidth
                ref={anchorEl}
                placeholder="Search..."
                InputProps={{
                  startAdornment: <Search sx={{ color: '#3D424B', mr: 1 }} />,
                  sx: { border: 'none', backgroundColor: '#2A2E36', boxShadow: 'none',  }
                }}
                sx={{
                  backgroundColor: '#2A2E36',
                  borderRadius: '8px',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '& input::placeholder': { textAlign: 'left' }, // Aligns placeholder left
                  '& .MuiInputBase-input': { 
                    color: '#3D424B', 
                    paddingLeft: '8px', // Ensure text is aligned to the left
                    textAlign: 'left', 
                  },
            

                }}
              />
              {
                isMobile && ( <Box p={1}>
                  {!searchEnabled && (
                    <StyledIconButton onClick={() => setSearchEnabled(true)}>
                      <Search />
                    </StyledIconButton>
                  )}
                </Box>)
              } */}

              <Grow in={isMobile?searchEnabled:searchTerm !== ''}>
               
                <Box
                  sx={{
                    position: 'absolute',
                    zIndex: 9999,
                    border: 0,
                    mt: 1 / 2,
                    mr: 1,
                    borderRadius: 1,
                    width: '100%',
                    maxHeight: 240,
                    background: '#171A24',
                    backdropFilter: 'blur(8px)',
                    // overflow: 'scroll',
                    boxShadow: '0px 0px 7px 7px #00000027',
                    overflowY: 'scroll', // Enable vertical scrolling
                      scrollbarWidth: 'none', // Hide scrollbar for Firefox
                      '&::-webkit-scrollbar': { display: 'none' } 
                  }}>
                  {filteredSymbols.map((symbol, index) => {
                    return (
                      <Box
                        display="flex"
                        key={symbol.symbol}
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => handleClose(symbol)}
                        sx={{
                          cursor: 'pointer',
                          px: 2,
                          transition: 'background .4s',
                          ':hover': { background: '#ffffff14' },
                          borderBottom: filteredSymbols.length - 1 !== index ? '' : ''
                        }}>
                        <Box display="flex" alignItems="center">
                          <img width={20} height={20} src={`${process.env.BUBBLE_IMAGE_PATH}/${symbol.image}`} alt={symbol.name} />
                          <Typography color="white" ml={1} px={1} py={1}>
                            {symbol.name}
                          </Typography>
                        </Box>
                        <Typography fontWeight="600" color="#CCC" mr={1} px={1} py={1}>
                          {symbol.symbol}
                        </Typography>
                      </Box>
                    );
                  })}
                  {filteredSymbols.length === 0 && (
                    <Typography variant="h6" color="#CCC" ml={1} px={1} py={1}>
                      No symbols found
                    </Typography>
                  )}
                </Box>
              </Grow>
            </Box>
          </ClickAwayListener>

        {layout === "bubble" &&  (!isMobile) && (  <StyledTabs
          
          sx={{ width:isMobile?"90%":"60%"}}
              variant="scrollable"
              value={config.id}
              onChange={(e, val) => updateConfig(allConfigs.find((item) => val === item.id))}
              scrollButtons={false}>
              {allConfigs.map((item) => {
                return <StyledTab key={item.id} variant={calculateVarient(item)} label={item.name || Constant.renderLabel(item)} value={item.id} />;
              })}
            </StyledTabs>)}
        </>
      
    {
      !isMobile &&   <Box p={1} display={'flex'} gap={1}  padding={0}>
      <StyledIconButton sx={{height:"100%"}} onClick={() => setEditConfig(true)}>
        <Edit />
      </StyledIconButton>
      <StyledIconButton sx={{height:"100%"}} onClick={() => handleAddConfig()}>
        <Add />
      </StyledIconButton>
    </Box>
    }
     

      <ConfigurationDialog />
      {isMobile?null:<FooterTabs/>}
    </Stack>
  );
};

export default HeaderTabs;
