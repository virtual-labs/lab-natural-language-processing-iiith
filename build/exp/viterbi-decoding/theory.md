Viterbi Decoding is based on dynamic programming. This algorithm takes emission and transmission matrix as the input. Emission matrix gives us information about proabities of a POS tag for a given word and transmission matrix gives the probability of transition from one POS tag to another POS tag. It observes sequence of words and returns the state sequences of POS tags along with its probability.

<img src="images/viterbi_algo.png">


Here "s" denotes words and "t" denotes tags. "a" is transmission matrix and "b" is emission matrix.

Using above algorithm, we have to fill the viterbi table column by column.