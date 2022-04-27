const Crud = artifacts.require("Crud");

contract("Crud", () => {
  let crud = null;
  before(async () => {
    crud = await Crud.deployed();
  });
  // create
  it("Should be create a player", async () => {
    await crud.create("Player 1");
    const player = await crud.read(1);
    assert(player[0].toNumber() === 1);
    assert(player[1] === "Player 1");
  });

  // update
  it("Should be update player", async () => {
    await crud.update(1, "Player 1 update");
    const player = await crud.read(1);
    assert(player[0].toNumber() === 1);
    assert(player[1] === "Player 1 update");
  });

  it("Should be return revert is player do not exist", async () => {
    try {
      await crud.update(2, "Player 2");
    } catch (e) {
      assert(e.message.includes("Player does not exist"));
      return;
    }
    assert(false);
  });

  //delete
  it("Should be delete a player", async () => {
    await crud.delete_data(1);
    try {
      await crud.read(1);
    } catch (e) {
      assert(e.message.includes("Player does not exist"));
      return;
    }
    assert(false);
  });

  it("Should be delete a player unhappy", async () => {
    try {
      await crud.delete_data(10);
    } catch (e) {
      assert(e.message.includes("Player does not exist"));
      return;
    }
    assert(false);
  });
});
