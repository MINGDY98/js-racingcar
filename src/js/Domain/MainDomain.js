import MatchNumber from "../state/MatchNumber.js";
import RacingCarInfo from "../state/RacingCarInfo.js";
import RunRacingRenderer from "../RunRacingRenderer.js";
import RunRacingView from "../RunRacingView.js";
import View from "../View.js";

class MainDomain {
  static MIN_CARNAME_SIZE = 1;
  static MAX_CARNAME_SIZE = 5;
  #prepareRacingView = null;
  #contestantView = null;

  constructor(prepareRacingView, contestantView) {
    this.initEventListener();
    this.#prepareRacingView = prepareRacingView;
    this.#contestantView = contestantView;
  }

  set prepareRacingView(v) {
    if (v instanceof View) this.#prepareRacingView = v;
    else throw `invalid vie : ${v}`;
  }
  set contestantView(v) {
    if (v instanceof View) this.#contestantView = v;
    else throw `invalid vie : ${v}`;
  }

  testCarNameSize(carName) {
    return (
      MainDomain.MIN_CARNAME_SIZE <= carName.trim().length &&
      carName.trim().length <= MainDomain.MAX_CARNAME_SIZE
    );
  }

  submitCarNames(e) {
    if (!e.target[1].value) {
      return;
    }
    const carNames = e.target[1].value.split(",");
    const invalidCarName = carNames.find((v) => !this.testCarNameSize(v));
    if (invalidCarName) {
      alert("5자 이하의 자동차 이름을 입력하세요.");
      return;
    }
    RacingCarInfo.setRaceParticipateCar(carNames);
    this.#prepareRacingView.initView();
  }

  submitNumberOfRaces(e) {
    MatchNumber.setMatchNumber(e.target[4].valueAsNumber);
    this.#contestantView.initView();
    const runRacingRenderer = new RunRacingRenderer(new RunRacingView());
    runRacingRenderer.initRenderer();
  }

  prepareGame = (e) => {
    e.preventDefault();
    this.#prepareRacingView.setElement(e);
    if (e.submitter.id == "car-name-btn") {
      this.submitCarNames(e);
    } else {
      this.submitNumberOfRaces(e);
    }
  };

  initEventListener() {
    document
      .querySelector("#racing-game-prepation-form")
      .addEventListener("submit", this.prepareGame);
  }
}
export default MainDomain;