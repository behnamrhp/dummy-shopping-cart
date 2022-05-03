import { IconButton } from "@mui/material";
import styled from "styled-components";
import { Drawer } from '@mui/material';

export const Wrapper = styled.div`
    margin: 40px;
`

export const StyledButton = styled(IconButton)`
    position: fixed;
    z-index: 100;
    right: 20px;
    top: 20px;
`

export const CustomDrawer = styled(Drawer)`
    background-color : red;
    
    @media screen and (max-width : 600px) {
        width: 70% !important;
    }
`