// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import { useSelector } from 'react-redux'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, SubMenu } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import { getUserInfo } from '@/utils/reduxFunc'
import type { User } from '@/types/userTypes'
import type { RootState } from '@/store/store'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const menu = {
  admin: [
    {
      name: 'Admin',
      icon: 'tabler-shield-check',
      href: '/admin'
    },
    {
      name: 'School',
      icon: 'tabler-school',
      href: '/school'
    }
  ],
  principal: [
    {
      name: 'Course',
      icon: 'tabler-book',
      href: '/course'
    }
  ],
  teacher: []
}

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const userInfo = useSelector<RootState, User>(getUserInfo())

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/home' icon={<i className='tabler-smart-home' />}>
          Home
        </MenuItem>
        <MenuItem href='/about' icon={<i className='tabler-info-circle' />}>
          About
        </MenuItem>
        {/* <MenuItem href='/admin' icon={<i className='tabler-shield-check' />}>
          Admin
        </MenuItem>
        <MenuItem href='/admin/school' icon={<i className='tabler-school' />}>
          School
        </MenuItem> */}
        {menu?.[userInfo?.role] &&
          menu?.[userInfo?.role]?.map(({ href, name, icon }, index) => (
            <MenuItem href={href} icon={<i className={icon} />} key={index}>
              {name}
            </MenuItem>
          ))}
        <SubMenu label='navigation' icon={<i className='tabler-chart-bar' />}>
          <MenuItem href={`//pages/widget-examples/basic`}>{['navigation']}</MenuItem>
          <MenuItem href={`//pages/widget-examples/advanced`}>{['navigation']}</MenuItem>
          <MenuItem href={`//pages/widget-examples/statistics`}>{['navigation']}</MenuItem>
          <MenuItem href={`//pages/widget-examples/charts`}>{['navigation']}</MenuItem>
          <MenuItem href={`//pages/widget-examples/actions`}>{['navigation']}</MenuItem>
        </SubMenu>
      </Menu>
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <GenerateVerticalMenu menuData={menuData()} />
      </Menu> */}
    </ScrollWrapper>
  )
}

export default VerticalMenu
