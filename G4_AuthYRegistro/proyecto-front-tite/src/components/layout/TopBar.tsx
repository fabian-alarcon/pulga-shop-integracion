import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import StorefrontIcon from '@mui/icons-material/Storefront';
import React, { useEffect, useState } from "react";
import BrandLogo from "../BrandLogo";

type TopBarProps = {
  onMenuClick?: () => void;
  rightSlot?: React.ReactNode;
  logoClickable?: boolean;
};

export default function TopBar({ onMenuClick, rightSlot, logoClickable = true }: TopBarProps) {
  const [isVendedor, setIsVendedor] = useState(false);

  useEffect(() => {
    // Intentamos obtener el usuario del almacenamiento local
    // G4 normalmente guarda el objeto 'user' o 'userInfo' al hacer login
    const userData = localStorage.getItem('user') || localStorage.getItem('userInfo');
    
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Verificamos si en el array de roles existe 'vendedor'
        if (user.roles && user.roles.includes('vendedor')) {
          setIsVendedor(true);
        }
      } catch (error) {
        console.error("Error parseando usuario del localStorage", error);
      }
    }
  }, []);

  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar sx={{ gap: 2 }}>
        <BrandLogo height={40} clickable={logoClickable} />
        
        <Box sx={{ flex: 1 }} />

        {/* --- ENLACE CONDICIONAL (Versión LocalStorage) --- */}
        {isVendedor && (
          <Button
            href="/inventario/"
            variant="contained"
            color="secondary"
            startIcon={<StorefrontIcon />}
            sx={{ 
              borderRadius: '8px', 
              textTransform: 'none',
              fontWeight: 'bold',
              ml: 2 
            }}
          >
            Gestionar Inventario
          </Button>
        )}

        {rightSlot}
        
        {onMenuClick && (
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={onMenuClick}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
}