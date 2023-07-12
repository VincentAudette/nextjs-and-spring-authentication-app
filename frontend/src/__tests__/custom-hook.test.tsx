import {renderHook, act} from '@testing-library/react-hooks'
import {useWebflix} from '../../context/webflix-context';
import {render, screen, waitFor} from '@testing-library/react'
import Dashboard from '../../pages/dashboard';
test('Expose the', () => {
    const {result} = renderHook(useWebflix)
    // render(<Dashboard />)
    
    // expect(result.current).toBe(null)
  })