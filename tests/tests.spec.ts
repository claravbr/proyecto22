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