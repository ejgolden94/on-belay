import React from 'react'
import { Link } from 'react-router-dom'
import {Menu, Icon} from 'semantic-ui-react'
import BackButton from './BackButton'
import useWindowSize from '../useWindowSize'

export default function Nav (props){
    const { height, width } = useWindowSize();

    const MenuItems = (
        <>
        <Menu.Item>
            <BackButton />
        </Menu.Item>
        <Menu.Item name='profile' position='right' className='font-inherit'>
            <Icon inverted name='user' />
            profile
        </Menu.Item>
        <Link to='/'>
            <Menu.Item name='home' className='font-inherit'>
                <Icon inverted name='home'/>
                home
            </Menu.Item>
        </Link>
        <Link to='/climbs/type'>
            <Menu.Item name='add' className='font-inherit'>
                <Icon inverted name='add circle'/>
                climb
            </Menu.Item>
        </Link>
        <Link to='/routes'>
            <Menu.Item name='compass outline' className='font-inherit'>
                    <Icon inverted name='compass outline'/>
                    routes
            </Menu.Item>
        </Link>
        <Link to='/climbs'>
            <Menu.Item name='history' className='font-inherit'>
                <Icon inverted name='history'/>
                history
            </Menu.Item>
        </Link>
        <Menu.Item name='sign-out' className='font-inherit'>
            <Icon inverted name='sign-out'/>
            sign-out
        </Menu.Item>
        </>
    )
    
    if(width >= 605){
    return (
        <Menu icon='labeled' inverted  className='nav'>
            {MenuItems}
        </Menu>
    )
    }else{
        return(
            <Menu icon='labeled' inverted  className='nav'>
                <Menu.Item>
                    <BackButton />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Icon inverted name='sidebar' size='large'/>
                </Menu.Item> 
            </Menu>
        )
    }
}