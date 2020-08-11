
const router = require('express').Router();
const {deleteLogo, updateLogo, createLogo, getLogos} = require('../database/logos');
router.get('/', async (req, res) => {
  res.send(await getLogos());
});
router.post('/', async (apiRequest, apiResponse) => {
  const newLogo = apiRequest.body;
  await createLogo(newLogo);
  apiResponse.send({
    message: 'New Logo created.',
    allLogos: await getLogos(),
    thanks: true
  });
});
// endpoint to delete a Logo
router.delete('/:LogoId', async (apiRequest, apiResponse) => {
  await deleteLogo(apiRequest.params.LogoId);
  apiResponse.send({ message: 'Logo deleted.' });
});
// endpoint to update a Logo
router.put('/:id', async (apiRequest, apiResponse) => {
  const updatedLogo = apiRequest.body;
  console.log({ updatedLogo})
  await updateLogo(apiRequest.params.id, updatedLogo);
  apiResponse.send({ message: 'Logo updated.' });
});


module.exports = router;