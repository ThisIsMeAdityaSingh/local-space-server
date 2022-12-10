/* eslint-disable no-undef */
const request = require('supertest');
const { server, appServer } = require('../../../index');

describe('Create Admin endpoints', () => {
  const generateURL = endpoint => `/auth/admin/${endpoint}`;
  describe('Test endpoint for empty of absent values', () => {
    test('should fail with empty request body', async () => {
      const res = await request(server)
        .post(generateURL('register'))
        .send();

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    const workingPayload = {
      firstName: 'Tester',
      lastName: 'User',
      email: 'testerUser1@gmail.com',
      password: 'Techneplus@12345',
      phone: '4325453535',
      paid: true,
      addressLine1: 'Avatar',
      addressLine2: '20425',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500063'
    };

    const requiredProperties = Object.keys(workingPayload);

    test.each(requiredProperties)('should fail with no %s', async (item) => {
      const testPayload = { ...workingPayload };
      delete testPayload[item];

      const res = await request(server)
        .post(generateURL('register'))
        .send(testPayload);

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });

    test.each(requiredProperties)('should fail with empty %s values', async (item) => {
      const testPayload = { ...workingPayload };
      testPayload[item] = '';

      const res = await request(server)
        .post(generateURL('register'))
        .send(testPayload);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('Test endpoint for invalid values', () => {
    const workingPayload = {
      firstName: 'Tester',
      lastName: 'User',
      email: 'testerUser1@gmail.com',
      password: 'Techneplus@12345',
      phone: '4325453535',
      paid: true,
      addressLine1: 'Avatar',
      addressLine2: '20425',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500063'
    };

    const testCases = [
      { property: 'firstName', value: 'AD' },
      {
        property: 'firstName',
        value: 'LoremipsumdolorsitametconsectetueradipiscingelitAeneancommodoligulaegetdolorAeneanmassaCumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculusmusDonecquamfelisultriciesnecpellentesqueeupretiumquissemNullaconsequatmassaquisenim.Donecpedejustofringillavelaliquetnecvulputateeget'
      },
      { property: 'firstName', value: 'AD43423' },
      { property: 'firstName', value: '321312' },
      { property: 'firstName', value: '$#@$@#$ADA3213' },
      { property: 'firstName', value: 534545345 },
      { property: 'firstName', value: { firstName: 'aditya' } },
      { property: 'lastName', value: 'AD' },
      {
        property: 'lastName',
        value: 'LoremipsumdolorsitametconsectetueradipiscingelitAeneancommodoligulaegetdolorAeneanmassaCumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculusmusDonecquamfelisultriciesnecpellentesqueeupretiumquissemNullaconsequatmassaquisenim.Donecpedejustofringillavelaliquetnecvulputateeget'
      },
      { property: 'lastName', value: 'AD43423' },
      { property: 'lastName', value: '321312' },
      { property: 'lastName', value: '$#@$@#$ADA3213' },
      { property: 'lastName', value: 534545345 },
      { property: 'lastName', value: { lastName: 'aditya' } },
      { property: 'phone', value: '4324' },
      { property: 'phone', value: '123456789876' },
      { property: 'phone', value: 'fsgdsfgs' },
      { property: 'phone', value: '432423fsfsfg' },
      { property: 'phone', value: 'rwfg#$@$u08798' },
      { property: 'phone', value: 4354543 },
      { property: 'email', value: 't@g.com' },
      { property: 'email', value: '4543523' },
      { property: 'email', value: 'aditya@singh.' },
      { property: 'email', value: '@gmail.com' },
      { property: 'email', value: 'aditya@gmail..com' },
      { property: 'email', value: 'aditya.com@gmail' },
      { property: 'email', value: 4354543 },
      {
        property: 'email',
        value: 'LoremipsumdolorsitametconsectetueradipiscingelitAeneancommodoligulaegetdolorAeneanmassaCumsociisnatoquepenatibusetmagnisdisparturientmontesnasceturridiculusmusDonecquamfelisultriciesnecpellentesqueeupretiumquissemNullaconsequatmassaquisenim.Donecpedejustofringillavelaliquetnecvulputateeget@gmail.com'
      },
      { property: 'pincode', value: 'fdsfsf' },
      { property: 'pincode', value: '4432@#@' },
      { property: 'pincode', value: 'ffsd$#@$32' },
      { property: 'pincode', value: '43234214243432' },
      { property: 'password', value: '4323' },
      {
        property: 'password',
        value: 'fdskjfhjerbgjkergbrgjrblgjbweighpiruhtuwheriutheriuteriuthrfdskjfhjerbgjkergbrgjrblgjbweighpiruhtuwheriutheriuteriuth'
      },
      { property: 'password', value: 'Aditya@Singh' },
      { property: 'password', value: 'AdityaSingh1' },
      { property: 'password', value: '321324##@%' },
      { property: 'password', value: 43534564 }
    ];

    test.each(testCases)('should fail with invalid value of $property', async ({ property, value }) => {
      const testPayload = { ...workingPayload };
      testPayload[property] = value;
      const res = await request(server)
        .post(generateURL('register'))
        .send(testPayload);
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('Positive Sign Up flow', () => {});

  describe('Test login endpoints', () => {});

  // delete admin in after all
});

afterAll(() => appServer.close());
