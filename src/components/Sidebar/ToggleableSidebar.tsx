import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import useMobile from '../../hooks/useMobile';
import { Offcanvas } from 'react-bootstrap';
import Sidebar from './Sidebar';

type Props = {
    children: JSX.Element,
    width?: number | string,
    isShown?: boolean,
    setIsShown?: (isShowed: boolean) => void
}

export default function ToggleableSidebar({ children, width = 'auto', isShown = true, setIsShown = () => {} }: Props) {

    const { isMobile } = useMobile();
    const { theme } = useContext(ThemeContext);

    return (
        <>
        {!isMobile ? 

        <div>
            {isShown && <Sidebar width={width}>{children}</Sidebar>}
        </div> : 
        
        <Offcanvas show={isShown} onHide={() => setIsShown(false)}>
            <Offcanvas.Header style={theme.style} closeButton>
                <Offcanvas.Title style={theme.style}>Thumbnail Page</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body style={theme.style}>{children}</Offcanvas.Body>
        </Offcanvas>}
        </>
    );
}
