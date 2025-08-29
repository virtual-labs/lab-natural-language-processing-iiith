**1.** For the following corpus, manually compute the bigram probabilities for all word pairs using Add-One Smoothing. Compare your results with the simulation output.

    (eos) I booked a flight (eos) I took a flight (eos)

**2.** Explain why smoothing is necessary in N-gram models. Provide examples from the experiment where smoothing changes the probability from zero to a non-zero value.

**3.** Run the simulation with at least two different corpora. Observe and report how the bigram probability distributions change with and without smoothing.

**4.** Given the following bigram counts, fill in the missing probabilities using Add-One Smoothing:

| Previous Word | Next Word | Count |
| ------------- | --------- | ----- |
| I             | booked    | 3     |
| I             | took      | 2     |
| booked        | a         | 3     |
| took          | a         | 2     |
| a             | flight    | 5     |
| flight        | eos       | 5     |

- Calculate \( P(\text{booked} | I) \), \( P(\text{took} | I) \), and \( P(\text{flight} | a) \) using Add-One Smoothing (assume vocabulary size \( V = 6 \)).

**5.** Describe a real-world NLP application where N-gram smoothing would be essential. Explain how zero probabilities could affect the application and how smoothing resolves this.

---

**Submit your answers as a PDF or text document. Include screenshots from the simulation where appropriate.**
