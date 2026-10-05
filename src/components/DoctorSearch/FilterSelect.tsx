import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useId, useState } from 'react'
import chevronDown from '@/assets/doctor-search/chevron-down-filter.svg'
import { layout } from '@/theme/theme.ts'

type FilterSelectProps = {
  label: string
  value: string
  options: readonly string[]
  icon: string
  onChange: (value: string) => void
}

export function FilterSelect({ label, value, options, icon, onChange }: FilterSelectProps) {
  const menuId = useId()
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const open = Boolean(anchor)

  return (
    <>
      <Button
        type="button"
        aria-haspopup="listbox"
        aria-controls={open ? menuId : undefined}
        aria-expanded={open}
        onClick={(event) => {
          setAnchor(event.currentTarget)
        }}
        sx={{
          height: layout.filterHeight,
          px: '23px',
          gap: '13px',
          borderRadius: `${layout.filterRadius}px`,
          border: '1.5px solid #E8EFF5',
          bgcolor: 'background.paper',
          color: 'text.primary',
          fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
          fontSize: 18,
          fontWeight: 400,
          lineHeight: 1,
          whiteSpace: 'nowrap',
          '&:hover': {
            bgcolor: 'background.paper',
            borderColor: '#D6E5EF',
          },
        }}
      >
        <Box component="img" src={icon} alt="" sx={{ width: 24, height: 24, display: 'block' }} />
        {value}
        <Box component="img" src={chevronDown} alt="" sx={{ width: 18, height: 18, display: 'block', ml: '4px' }} />
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchor}
        open={open}
        onClose={() => {
          setAnchor(null)
        }}
        slotProps={{
          list: { 'aria-label': label },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === value}
            onClick={() => {
              onChange(option)
              setAnchor(null)
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
