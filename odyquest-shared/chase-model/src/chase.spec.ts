import {Chase} from './chase';
import {Narrative} from './narrative';
import {Quest} from './quest';
import {getTestChase} from './example/chase_example';

describe('Chase', () => {
  let chase = getTestChase();

  beforeEach(() => {
  });

  it('should have element access', () => {
    expect(chase.getElement(0) instanceof Narrative).toBeTruthy();
    expect((chase.getElement(0) as Narrative).title).toEqual('narrative_title');
    expect(chase.getElement(1) instanceof Quest).toBeTruthy();
    expect((chase.getElement(1) as Quest).title).toEqual('quest_title');
  });

});
