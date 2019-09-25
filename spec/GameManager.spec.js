import GameManager from '../public/scripts/gameManager';
import Knight from '../public/scripts/characters/knight';

describe('The GameManager getInstance', () =>{
  beforeEach(()=> {
    spyOn(GameManager, '_createInstance').and.callFake(() => {
      GameManager._instance = new GameManager();
      GameManager._instance._gameObjectList = [];
      GameManager._instance._context = {
        drawImage: function() {
        },
      };
    });
  });

  afterEach(()=>{
    GameManager._instance = null;
  });

  it('should return the same instance when getInstance is called twice', ()=>{
    // create a spy to stop gameManager from calling document

    const instance1 = GameManager.getInstance();
    const instance2 = GameManager.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should add a character with insert, and call its start function', ()=>{
    const gameManager = GameManager.getInstance();
    const knight = new Knight(0, 0, null);
    // don't actually call start
    spyOn(knight, 'start');
    gameManager.insertGameObject(knight);
    // make sure the knight gets added and its start method is called
    expect(gameManager.gameObjects.length).toBe(1);
    expect(knight.start).toHaveBeenCalled();
  });

  it('should call update on all characters when draw is called', ()=>{
    const gameManager = GameManager.getInstance();
    const knight1 = new Knight(0, 0, null);
    const knight2 = new Knight(0, 0, null);
    spyOn(knight1, 'start');
    spyOn(knight2, 'start');
    spyOn(knight1, 'update');
    spyOn(knight2, 'update');
    spyOn(GameManager.getInstance()._context, 'drawImage');
    gameManager.insertGameObject(knight1);
    gameManager.insertGameObject(knight2);

    gameManager.draw();

    expect(knight1.update).toHaveBeenCalled();
    expect(knight2.update).toHaveBeenCalled();
  });
});

