import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useId, useState } from 'react'
import chevronDown from '@/assets/doctor-search/chevron-down.svg'
import mapPin from '@/assets/doctor-search/map-pin-location.svg'
import searchIcon from '@/assets/doctor-search/search.svg'
import searchWhite from '@/assets/doctor-search/search-white.svg'
import { cityOptions } from '@/data/doctors.ts'
import { layout } from '@/theme/theme.ts'

type SearchInputProps = {
  query: string
  city: string
  onQueryChange: (query: string) => void
  onCityChange: (city: string) => void
  onSearch: () => void
}

export function SearchInput({ query, city, onQueryChange, onCityChange, onSearch }: SearchInputProps) {
  const menuId = useId()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const open = Boolean(anchor)

  return (
    <Box
      component="form"
      role="search"
      onSubmit={(event) => {
        event.preventDefault()
        onSearch()
      }}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { md: 'center' },
        gap: '15px',
        width: '100%',
        maxWidth: { xl: 1146 },
        minHeight: { md: layout.searchBarHeight },
        p: '9px',
        bgcolor: 'background.paper',
        border: '1.5px solid #D6E5EF',
        borderRadius: `${layout.searchBarRadius}px`,
        boxShadow: '0px 4px 12px rgba(40, 78, 112, 0.09)',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '17px',
          flex: 1,
          minWidth: 0,
          height: { xs: 56, md: layout.searchControlHeight },
          pl: '14px',
        }}
      >
        <Box component="img" src={searchIcon} alt="" sx={{ width: 27, height: 27, display: 'block', flexShrink: 0 }} />
        <InputBase
          value={query}
          onChange={(event) => {
            onQueryChange(event.target.value)
          }}
          placeholder="Search doctors, specialities or conditions..."
          inputProps={{ 'aria-label': 'Search doctors, specialities or conditions' }}
          sx={{
            flex: 1,
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: { xs: 16, md: 21 },
            color: 'text.primary',
            '& input::placeholder': {
              color: 'text.secondary',
              opacity: 1,
            },
          }}
        />
      </Box>
      <Button
        type="button"
        aria-haspopup="listbox"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        aria-label={`City, ${city}`}
        onClick={(event) => {
          setAnchor(event.currentTarget)
        }}
        sx={{
          width: { xs: '100%', md: layout.locationWidth },
          height: layout.searchControlHeight,
          px: '23px',
          gap: '12px',
          flexShrink: 0,
          justifyContent: 'flex-start',
          borderRadius: '16px',
          border: '1.5px solid #F0F3F6',
          bgcolor: 'background.paper',
          color: '#111111',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontSize: 20,
          fontWeight: 400,
          '&:hover': {
            bgcolor: 'background.paper',
            borderColor: '#D6E5EF',
          },
        }}
      >
        <Box component="img" src={mapPin} alt="" sx={{ width: 27, height: 27, display: 'block' }} />
        <Box component="span" sx={{ flex: 1, textAlign: 'left' }}>
          {city}
        </Box>
        <Box component="img" src={chevronDown} alt="" sx={{ width: 18, height: 18, display: 'block' }} />
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={open}
        onClose={() => {
          setAnchor(null)
        }}
        slotProps={{
          list: { 'aria-label': 'City' },
        }}
      >
        {cityOptions.map((option) => (
          <MenuItem
            key={option}
            selected={option === city}
            onClick={() => {
              onCityChange(option)
              setAnchor(null)
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
      <Button
        type="submit"
        sx={{
          width: { xs: '100%', md: layout.searchButtonWidth },
          height: layout.searchControlHeight,
          flexShrink: 0,
          gap: '14px',
          borderRadius: '15px',
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: { xs: 20, md: 24 },
          fontWeight: 500,
          '&:hover': {
            bgcolor: '#064E94',
          },
        }}
      >
        <Box component="img" src={searchWhite} alt="" sx={{ width: 28, height: 28, display: 'block' }} />
        Search
      </Button>
    </Box>
  )
}
