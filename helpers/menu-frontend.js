

const getMenuFrontEnd = (rol = '') => {

    // console.log('getmenu', rol);

    const menu = [];
    
    if(rol == "60df6e869f7e430e2dcea455") {
      // console.log('despachante');
      menu.push(
        {
          titulo: 'Despachante',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Denuncias', url: 'denuncias' },
            { titulo: 'Alertas', url: 'alertas' },
          ]
        }
      )
      // return menu;
    } 

    if(rol == "60df6e599f7e430e2dcea452"){
      // console.log('admin');
      menu.push(
        {
          titulo: 'Despachante',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo: 'Denuncias', url: 'denuncias' },
            { titulo: 'Alertas', url: 'alertas' },
          ]
        },
        {
          titulo: 'Mantenimiento',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            { titulo: 'Usuarios', url: 'usuarios' },
            { titulo: 'Roles', url: 'roles' },
            { titulo: 'Departamentos', url: 'departamentos' },
            { titulo: 'Ciudades', url: 'ciudades' },
            { titulo: 'Estados', url: 'estados' },
            { titulo: 'Niveles', url: 'niveles' },
            { titulo: 'Tipo Emergencia', url: 'tipo-emergencias' }
          ]
        }
      )
    }
    // if(rol === '60df6e869f7e430e2dcea455') {
      return menu;
    //   console.log('es despachante');
    //   menu[0] = {
    //     titulo: 'Despachante',
    //     icono: 'mdi mdi-gauge',
    //     submenu: [
    //       { titulo: 'Denuncias', url: 'denuncias' },
    //       { titulo: 'Alertas', url: 'alertas' },
    //     ]
    //   }
    //   return menu;
    // }
    
    // if(rol === '60df6e599f7e430e2dcea452') {
    //   console.log('es admin');
    //   menu[0] = {
    //     titulo: 'Despachante',
    //     icono: 'mdi mdi-gauge',
    //     submenu: [
    //       { titulo: 'Denuncias', url: 'denuncias' },
    //       { titulo: 'Alertas', url: 'alertas' },
    //     ]
    //   }
    //   menu[1] = {
    //     titulo: 'Mantenimiento',
    //     icono: 'mdi mdi-folder-lock-open',
    //     submenu: [
    //       { titulo: 'Usuarios', url: 'usuarios' },
    //       { titulo: 'Roles', url: 'roles' },
    //       { titulo: 'Departamentos', url: 'departamentos' },
    //       { titulo: 'Ciudades', url: 'ciudades' },
    //       { titulo: 'Estados', url: 'estados' },
    //       { titulo: 'Niveles', url: 'niveles' },
    //       { titulo: 'Tipo Emergencia', url: 'tipo-emergencias' }
    //     ]
    //   }
    // }

}

module.exports = {
  getMenuFrontEnd
}