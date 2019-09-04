import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

//conecta o enzyme com o Jest
configure({adapter: new Adapter()});

describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    });

    it('should render 2 <NavigationItem /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> elements if authenticated', ()=>{
        wrapper.setProps({auth:true}); 
        //seta a prop auth para true, do compoenente <NavigationItems />
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain <NavigationItem link="logout">Logout</NavigationItem> element if authenticated', ()=>{
        wrapper.setProps({auth:true}); 
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});