import { test, expect } from '@playwright/test';

test('end-to-end', async ({ browser }) => {
  const pepeContext = await browser.newContext();
  const luisContext = await browser.newContext();

  //navegador para cada jugador
  const pepepage = await pepeContext.newPage();
  const luispage = await luisContext.newPage();

  // -- PEPE --
  // Inicio de sesión
  await pepepage.goto('http://localhost:3000/');
  await pepepage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await pepepage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('pepe');
  await pepepage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Crear partida
  await pepepage.getByRole('button', { name: 'Crear partida' }).click();

  // -- LUIS --
  // Inicio de sesion
  await luispage.goto('http://localhost:3000/');
  await luispage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await luispage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('luis');
  await luispage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Unirse a partida
  await luispage.getByRole('link', { name: 'Sala 1 - Propietario: pepe' }).click();
  
  await luispage.getByRole('button', { name: 'Cerrar' }).click();
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();

  // -- PEPE --
  // Coloca sus barcos
  await pepepage.getByText('Fragata (Tam. 1H)').click();
  await pepepage.locator('.grid-cell').first().click();
  await pepepage.getByText('Destructor (Tam. 2H)').click();
  await pepepage.locator('div:nth-child(11)').first().click();
  await pepepage.getByText('Acorazado (Tam. 3H)').click();
  await pepepage.locator('div:nth-child(21)').first().click();
  await pepepage.getByText('Submarino(Tam. 4H)').click();
  await pepepage.locator('div:nth-child(31)').first().click();

  // -- LUIS --
  // Coloca sus barcos
  await luispage.getByText('Fragata (Tam. 1H)').click();
  await luispage.locator('div:nth-child(12)').first().click();
  await luispage.getByText('Destructor (Tam. 2H)').click();
  await luispage.locator('div:nth-child(42)').first().click();
  await luispage.getByText('Submarino(Tam. 4H)').click();
  await luispage.locator('div:nth-child(65)').first().click();
  await luispage.getByText('Acorazado (Tam. 3H)').click();
  await luispage.locator('div:nth-child(82)').first().click();

  await luispage.getByRole('button', { name: 'Cerrar' }).click();
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();

  // Intercambio de disparos, empieza pepe
  await pepepage.locator('div:nth-child(2) > .grid > div:nth-child(12)').click();
  await pepepage.locator('div:nth-child(2) > .grid > div:nth-child(4)').click();

  //Cambio de turno
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();
  await luispage.getByRole('button', { name: 'Cerrar' }).click();

  await luispage.locator('div:nth-child(2) > .grid > div').first().click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(11)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(12)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(21)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(22)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(23)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(16)').click();

  //Cambio de turno
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();
  await luispage.getByRole('button', { name: 'Cerrar' }).click();

  await pepepage.locator('div:nth-child(2) > .grid > div:nth-child(42)').click();
  await pepepage.locator('div:nth-child(2) > .grid > div:nth-child(43)').click();
  await pepepage.locator('div:nth-child(2) > .grid > div:nth-child(45)').click();

  //Cambio de turno
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();
  await luispage.getByRole('button', { name: 'Cerrar' }).click();

  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(31)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(32)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(33)').click();
  await luispage.locator('div:nth-child(2) > .grid > div:nth-child(34)').click();

  //Luis ganador
  await pepepage.getByRole('button', { name: 'Cerrar' }).click();
  await luispage.getByRole('button', { name: 'Cerrar' }).click();
});


test('abandona-usuario', async ({ browser }) => {
  const mariaContext = await browser.newContext();
  const luisaContext = await browser.newContext();

  //navegador para cada jugador
  const mariapage = await mariaContext.newPage();
  const luisapage = await luisaContext.newPage();

  // -- maria --
  // Inicio de sesión
  await mariapage.goto('http://localhost:3000/');
  await mariapage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await mariapage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('maria');
  await mariapage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Crear partida
  await mariapage.getByRole('button', { name: 'Crear partida' }).click();

  // -- LUISA --
  // Inicio de sesion
  await luisapage.goto('http://localhost:3000/');
  await luisapage.getByPlaceholder('Introduce tu nick (max 6 letras)').click();
  await luisapage.getByPlaceholder('Introduce tu nick (max 6 letras)').fill('luisa');
  await luisapage.getByRole('button', { name: 'Iniciar Sesión' }).click();

  // Unirse a partida
  await luisapage.getByRole('link', { name: 'Sala 1 - Propietario: maria' }).click();
  
  await luisapage.getByRole('button', { name: 'Cerrar' }).click();
  await mariapage.getByRole('button', { name: 'Cerrar' }).click();

  // -- maria --
  // Coloca sus barcos
  await mariapage.getByText('Fragata (Tam. 1H)').click();
  await mariapage.locator('.grid-cell').first().click();
  await mariapage.getByText('Destructor (Tam. 2H)').click();
  await mariapage.locator('div:nth-child(11)').first().click();
  await mariapage.getByText('Acorazado (Tam. 3H)').click();
  await mariapage.locator('div:nth-child(21)').first().click();
  await mariapage.getByText('Submarino(Tam. 4H)').click();
  await mariapage.locator('div:nth-child(31)').first().click();

  // -- LUIS --
  // Coloca sus barcos
  await luisapage.getByText('Fragata (Tam. 1H)').click();
  await luisapage.locator('div:nth-child(12)').first().click();
  await luisapage.getByText('Destructor (Tam. 2H)').click();
  await luisapage.locator('div:nth-child(42)').first().click();
  await luisapage.getByText('Submarino(Tam. 4H)').click();
  await luisapage.locator('div:nth-child(65)').first().click();
  await luisapage.getByText('Acorazado (Tam. 3H)').click();
  await luisapage.locator('div:nth-child(82)').first().click();

  await luisapage.getByRole('button', { name: 'Cerrar' }).click();
  await mariapage.getByRole('button', { name: 'Cerrar' }).click();

  // Intercambio de disparos, empieza maria
  await mariapage.locator('div:nth-child(2) > .grid > div:nth-child(12)').click();
  await mariapage.locator('div:nth-child(2) > .grid > div:nth-child(4)').click();

  //Cambio de turno
  await mariapage.getByRole('button', { name: 'Cerrar' }).click();
  await luisapage.getByRole('button', { name: 'Cerrar' }).click();

  // Luisa se va a mitad de partida
  await luisapage.getByRole('button', { name: 'Abandonar' }).click();

  //Fin partida
  await mariapage.getByRole('button', { name: 'Cerrar' }).click();
  await luisapage.getByRole('button', { name: 'Cerrar' }).click();
});