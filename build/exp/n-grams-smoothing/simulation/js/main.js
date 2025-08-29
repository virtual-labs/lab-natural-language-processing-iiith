class CorpusManager {
  constructor() {
    this.corpusFiles = [
      { name: "Corpus A", file: "corpus-a.txt" },
      { name: "Corpus B", file: "corpus-b.txt" },
      { name: "Corpus C", file: "corpus-c.txt" },
      { name: "Corpus D", file: "corpus-d.txt" },
    ];
    this.corpusData = null;
    // Quiz data for each corpus
    this.quizData = {
      "corpus-a.txt": {
        sentence: "I can sit near you",
        bigrams: [
          { pair: "I|START", prob: 0.4 },
          { pair: "can|I", prob: 0.5 },
          { pair: "sit|can", prob: 0.6 },
          { pair: "near|sit", prob: 0.7 },
          { pair: "you|near", prob: 0.8 },
        ],
      },
      "corpus-b.txt": {
        sentence: "the cat sat on the mat",
        bigrams: [
          { pair: "the|START", prob: 0.3 },
          { pair: "cat|the", prob: 0.4 },
          { pair: "sat|cat", prob: 0.5 },
          { pair: "on|sat", prob: 0.6 },
          { pair: "the|on", prob: 0.7 },
          { pair: "mat|the", prob: 0.8 },
        ],
      },
      "corpus-c.txt": {
        sentence: "she likes apples",
        bigrams: [
          { pair: "she|START", prob: 0.3 },
          { pair: "likes|she", prob: 0.4 },
          { pair: "apples|likes", prob: 0.5 },
        ],
      },
      "corpus-d.txt": {
        sentence: "birds fly in the sky",
        bigrams: [
          { pair: "birds|START", prob: 0.3 },
          { pair: "fly|birds", prob: 0.4 },
          { pair: "in|fly", prob: 0.5 },
          { pair: "the|in", prob: 0.6 },
          { pair: "sky|the", prob: 0.7 },
        ],
      },
    };
    this.selectedCorpusFile = null;
  }

  async loadCorpus(file) {
    this.selectedCorpusFile = file;
    this.clearAll();
    const sentencesDiv = document.getElementById("corpus-sentences");
    sentencesDiv.innerHTML = '<div class="loading">Loading corpus...</div>';
    try {
      const response = await fetch(`data/corpora/${file}`);
      if (!response.ok) throw new Error("File not found");
      const text = await response.text();
      // Expecting: corpus & bigrams & order
      const parts = text.split("&");
      const corpus = parts[0] ? parts[0].trim() : "";
      const bigrams = parts[1] ? parts[1].trim() : "";
      const order = parts[2] ? parts[2].trim() : "";
      this.corpusData = { corpus, bigrams, order };

      // Display sentences
      const sentences = corpus
        .split("(eos)")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      let html = '<div class="corpus-content">';
      sentences.forEach((sentence) => {
        html += `<div class="corpus-sentence">${sentence}</div>`;
      });
      html += "</div>";
      sentencesDiv.innerHTML = html;

      // Show button
      const btnContainer = document.getElementById("find-bigram-btn-container");
      btnContainer.innerHTML = `<button id="bigramBtn" class="sim-button btn-primary">Find Bigram Probabilities</button>`;
      document.getElementById("bigramBtn").onclick = () =>
        this.renderBigramTable();
    } catch (err) {
      sentencesDiv.innerHTML = `<div class="error">Error loading corpus: ${err.message}</div>`;
    }
  }

  renderBigramTable() {
    const { bigrams, order } = this.corpusData;
    const bigramArr = bigrams.split(",").map((x) => x.trim());
    const orderArr = order.split(",").map((x) => x.trim());
    const size = orderArr.length;
    let idx = 0;
    let tableHtml = '<table class="transition-matrix-table"><tr><th></th>';
    for (let i = 0; i < size; i++) tableHtml += `<th>${orderArr[i]}</th>`;
    tableHtml += "</tr>";
    for (let i = 0; i < size; i++) {
      tableHtml += `<tr><th>${orderArr[i]}</th>`;
      for (let j = 0; j < size; j++) {
        // Defensive: if bigramArr[idx] is missing, use 0
        const val =
          typeof bigramArr[idx] !== "undefined" && bigramArr[idx] !== ""
            ? bigramArr[idx]
            : "0";
        // tableHtml += `<td id="td${idx}"><input type="text" size="3" name="${idx}" id="${idx}" value="0" class="ngram-input" style="background:#fff;width:100%;min-width:48px;box-sizing:border-box;"/></td>`;
        tableHtml += `<td id="td${idx}"><input type="text" size="3" name="${idx}" id="${idx}" value="0" class="ngram-input" /></td>`;
        idx++;
      }
      tableHtml += "</tr>";
    }
    tableHtml += "</table>";
    //tableHtml += `<div class="button-row" style="display:flex;justify-content:center;gap:12px;width:100%;max-width:100%;margin:0 auto;">
    //  <button id="submitBigram" class="sim-button btn-primary" style="min-width:120px;">Check</button>
    //  <button id="showAnswerBtn" class="sim-button btn-secondary" style="min-width:120px;">Show Answer</button>
    //  <button id="resetBtn" class="sim-button btn-secondary" style="min-width:120px;">Reset</button>
    //</div>`;
    //tableHtml += `<div id="answerContainer" style="flex:1"></div><div id="sentence"></div>`;
    tableHtml += `<div class="button-row">
      <button id="submitBigram" class="sim-button btn-primary">Check</button>
      <button id="showAnswerBtn" class="sim-button btn-secondary">Show Answer</button>
      <button id="resetBtn" class="sim-button btn-secondary">Reset</button>
    </div>`;
    tableHtml += `<div id="answerContainer"></div><div id="sentence"></div>`;
    const outputTable = document.getElementById("output-table-container");
    outputTable.innerHTML = tableHtml;
    document.getElementById("submitBigram").onclick = () =>
      this.checkBigramAnswers(bigramArr, size * size);
    document.getElementById("showAnswerBtn").onclick = () =>
      this.showBigramAnswers(bigramArr, size * size);
    document.getElementById("resetBtn").onclick = () => this.resetSimulation();
    // Show the quiz for the selected corpus
    this.renderSentenceProbabilityQuiz(this.selectedCorpusFile);
  }

  checkBigramAnswers(bigrams, count) {
    let allCorrect = true;
    for (let i = 0; i < count; i++) {
      const val = document.getElementById(i).value.trim();
      const correct =
        typeof bigrams[i] !== "undefined" && bigrams[i] !== ""
          ? bigrams[i]
          : "0";
      if (parseFloat(val) !== parseFloat(correct)) {
        document.getElementById("td" + i).style.backgroundColor = "#e57373";
        allCorrect = false;
      } else {
        document.getElementById("td" + i).style.backgroundColor = "#43a047";
      }
    }
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = allCorrect
      ? `<span style="color:green;">All answers are correct!</span>`
      : `<span style="color:red;">Some answers are incorrect. Please try again.</span>`;
  }

  showBigramAnswers(bigrams, count) {
    for (let i = 0; i < count; i++) {
      const val =
        typeof bigrams[i] !== "undefined" && bigrams[i] !== ""
          ? bigrams[i]
          : "0";
      document.getElementById(i).value = val;
      document.getElementById("td" + i).style.backgroundColor = "#43a047";
    }
    document.getElementById("feedback").innerHTML =
      '<span style="color:green;">Correct answers shown above.</span>';
  }

  resetSimulation() {
    document.getElementById("corpus").selectedIndex = 0;
    this.clearAll();
  }

  clearAll() {
    document.getElementById("corpus-sentences").innerHTML = "";
    document.getElementById("find-bigram-btn-container").innerHTML = "";
    document.getElementById("output-table-container").innerHTML = "";
    document.getElementById("feedback").innerHTML = "";
    document.getElementById("sentence-probability-container").innerHTML = "";
  }

  renderSentenceProbabilityQuiz(selectedCorpusFile) {
    const quiz = this.quizData[selectedCorpusFile];
    if (!quiz) {
      document.getElementById("sentence-probability-container").innerHTML = "";
      return;
    }
    let html = `<div class="sentence-prob-quiz"><h4>Sentence Probability Quiz</h4>
      <div>Calculate the probability of the sentence: <b>${quiz.sentence}</b></div>
      <table class="sentence-prob-table"><tr><th>Bigram</th><th>Probability</th></tr>`;
    quiz.bigrams.forEach((bp) => {
      html += `<tr><td>${bp.pair}</td><td>${bp.prob}</td></tr>`;
    });
    //<input type="text" id="sentenceProbInput" style="width:100px;" />
    //<button id="checkSentenceProb" class="sim-button btn-primary" style="margin-left:10px;">Check</button>
    html += `</table>
              <div>Enter the product of all probabilities above:</div>
              <div class="sentence-prob-input-row">
                <input type="text" id="sentenceProbInput" />
                <button id="checkSentenceProb" class="sim-button btn-primary">Check</button>
              </div>
              <div id="sentenceProbFeedback"></div>
    </div>`;
    document.getElementById("sentence-probability-container").innerHTML = html;
    document.getElementById("checkSentenceProb").onclick = () => {
      const userVal = parseFloat(
        document.getElementById("sentenceProbInput").value.trim()
      );
      const correctVal = quiz.bigrams.reduce((acc, bp) => acc * bp.prob, 1);
      const feedback = document.getElementById("sentenceProbFeedback");
      if (Math.abs(userVal - correctVal) < 1e-6) {
        feedback.innerHTML = `<span style="color:green;">Correct! The probability is ${correctVal.toFixed(
          6
        )}</span>`;
      } else {
        feedback.innerHTML = `<span style="color:red;">Incorrect. The correct probability is ${correctVal.toFixed(
          6
        )}</span>`;
      }
    };
  }
}

const corpusManager = new CorpusManager();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("corpus").addEventListener("change", (e) => {
    const file = e.target.value;
    if (file) corpusManager.loadCorpus(file);
    else corpusManager.resetSimulation();
  });
});
