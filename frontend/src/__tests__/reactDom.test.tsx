import DashboardView from '../../components/dashboard-view';
import {render,screen} from '@testing-library/react'

test('Renders dashboard view', async ()=>{
    const navigation = [
        { name: 'Dashboard', view:<div>DASHBOARD</div> },
        { name: 'Films', view:<div>FILMS</div>},
        { name: 'Locations', view:<div>LOCATIONS</div> },
      ];
    const {debug} = render(<DashboardView setActivePage={()=>{}} navigation={navigation}/>);

    const loadedHeader = screen.getByTestId(/d1/i);
    expect(loadedHeader.textContent).toBe("Dashboard");
    expect(loadedHeader.className).toBe("titre-section");
    
    const loadedDivContainer = screen.getByTestId(/d2/i);
    expect(loadedDivContainer.children.length).toBe(navigation.length -1);
    debug(loadedDivContainer)
    
})
