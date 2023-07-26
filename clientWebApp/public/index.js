await createMap()

setInterval(async function() {
  await refreshMap ()
  await thermal()
}, 2000)