**N-gram:**  
A contiguous sequence of N items (typically words) from a given text or speech sample.

**Bigram:**  
An N-gram where N=2; a sequence of two words.

**Trigram:**  
An N-gram where N=3; a sequence of three words.

**Smoothing:**  
A technique used in language modeling to adjust probability estimates for unseen N-grams, preventing zero probabilities.

**Add-One (Laplace) Smoothing:**  
A simple smoothing method that adds one to each N-gram count before calculating probabilities.

**Zero Probability Problem:**  
The issue that arises when an N-gram does not appear in the training data, resulting in a probability of zero.

**Vocabulary Size (V):**  
The total number of unique words in the corpus.

**Maximum Likelihood Estimate (MLE):**  
A method of estimating probabilities based on observed frequencies in the training data, without smoothing.

**Sparse Data:**  
A situation where many possible N-grams are not observed in the training corpus.
