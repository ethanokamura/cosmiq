## M1/M2
**Terms:**
1. **Machine Learning**: finding a formula that, when applied to a collection of inputs, produces desired outputs. (not actually learning) ie training a model to play mario kart -- once you tilt the screen a little bit, the 'input data' (visual graphics) becomes corrupted and it cant play anymore
2. **Model**: This is a generic term used for the hypothesis, or functions, that is learned
3. **Parameters**: The model typically has some parameters, often **weights** or coefficients, that need to be estimated from the data
	- with `y = mx + b`: `m` and `b` are parameters.
4. A "**trained**" or fit model is a mathematical function or algorithm that maps new inputs to outputs (using inductive reasoning)
5. **Regression**: predicting a continuous number

**Types of Reasoning:**
1. **Deductive** - applying one or many rules to specific circumstances.
	- ie: Birds can fly, and a penguin is a bird... penguins can fly
	- if the original assertions are true, then the conclusion must also be true
	- allows us to find guaranteed implications based on rules and propositions
2. **Inductive** - handling a bunch of evidence; no rules yet.
	- ie: It has rained for the past 6 days, it will rain tomorrow.
	- Inductive reasoning begins with observations that are specific and limited in scope and proceeds to a generalized conclusion that is likely, but not certain, in light of accumulated evidence
	- Inductive reasoning is only probable, not guaranteed...
	- Easy to have incomplete observations (your sample is never big enough -- a common problem for machine learning.)
3. **Abductive** - reasoning based on causes
	- ie: a medical diagnosis or a trial

**Types of ML (overview)**
1. Supervised Learning: uses **labeled examples of classes** (types of things) to construct a **classifier** (model) that can make **predictions** about future objects.
	- ie: Identifying liver cancer cells from previously seen examples of cancerous and non-cancerous cells. Or assistants learning which meetings are most important and how long to allocate for each type of meeting
	- Good for predictions using datasets with real data from history.
	- Given a dataset (which has a bunch of inputs and outputs), supervised learning tries to predict outputs with a given input using regression (typically linear regression).
	- **General Idea**: Attempts to fit a model to the dataset to predict outputs based on inputs. We know the correct output from real observations
2. Unsupervised Learning: organizes and analyzes **unlabeled observations** to identify **new categories of clusters** (clumps of data).
	- ie: Identifying groups of consumers with similar buying habits.
	- Good for getting general ideas from UNKNOWN datasets. A good start...
	- "Exploratory data analysis" that is helpful for hypothesis generation.
	- Finding clumps (or clusters) within a dataset.
	- Recommender systems: Identify groups of products (or documents, or users) with similar attributes.
3. Reinforcement Learning: uses **delayed feedback** about **actions** performed in some **environment** to learn the **value** of actions taken in specific contexts.
	- ie: Learning to control a car under slippery conditions.
	- Make a decision now that will influence an outcome later. (Delayed gratification)

**Supervised ML - Types**
1. **Classification**: output one of a set of discrete labels. (what it is)
	- yes/no, low/medium/high, cat/dog
	- Inputs:
		- **Feature vectors** describing data (Age, salary, education level)
			- Notation: x is input vector; xi is the ith feature
			- xi is the input vector; xij is the jth feature of the ith input vector
		- **Labels**: A label is a correct classification (desired output) associated with a particular input feature vector. (Receives bank loan)
2. **Regression**: output a real number. E.g., number (how much there is)
	- Within a range: (-inf,+inf), (0,+inf), (0.0,1.0)
3. **Ranking**: Output a ranking, either ordinal (0.0,1.0) or pairwise (ordering)

**Hypothesis and Loss**
1. **Hypothesis**: a function that takes an input feature and outputs a predicted label
2. **Loss**: a measure of the difference between hypothesis and desired output
	- 0/1 or a binary (yes/no true/false) is most common
- Error for testing: $E_t (h,X_t,Y_t) = \sum\limits_{x_i \in X_{t}, y_i \in Y_t} l(h(x_{i}),y_{i})$  
**Empirical Risk Minimization**
- optimizing the hypothesis (fond the one that is least wrong)
- $h* = argmin_{h \in H}  1/n \sum\limits_{x_i \in X_{t}, y_i \in Y_t} l(h(x_{i}),y_{i})$ where argmin is the x where the min y is

**Data Splitting**
1. **Training set**: Data used in training model
2. **Testing set**: Not seen in training, hypothesis should predict these values

**Overfitting**
- **Overfitting the data** means your model is complex enough to memorize the data rather than learn from it simply.
- You might think a more complex model will allow a better fit for the data, but sometimes this is not the case. Sometimes the relationship in the real world is not as complicated. As your model complexity increases, your lowest possible training set error decreases, as you would expect. However, the difference between estimated and true test set errors may increase.

**Evaluation Metrics:**
1. **Accuracy**: the proportion of correct predictions: ${TP+TN} \over {TP+TN+FP+FN}$
2. **Precision**: the proportion of positive predictions that are actually correct: ${TP} \over {TP+FP}$
3. **Recall**: the proportion of actual positive predictions that are correct: ${TP} \over {TP+FN}$

**ROC**
  ![[Screenshot 2025-01-23 at 7.29.56 PM.png|400]]

## M3/M4
**Terms:**
- **Bayesian** probability: specifies the degree of uncertainty that the user has about an event.  It is sometimes referred to as “subjective probability” or “degree of belief.”
- **Frequentist** probability: considers the relative frequencies of events of interest to the total number of events that occurred.  The probability of an event is defined as the relative frequency of the event in the limit when one has infinite data.
- **Outcomes**: mutually exclusive and disjoint (exactly one outcome occurs)
- **Sample Space**:  the set of all possible (disjoint) outcomes of an experiment.
- **Event**: A subset of outcomes (potential results of an experiment)
	- Events can overlap (any given outcome can be part of mutliple events)
- **Probability**: likelihood of an outcome in a sample space occurring on a single trial
- **Random Variable**: a mapping from outcomes in the sample space to values
	- Random variables have **domains** (sets of possible values)
- **Discrete**: finite set of possible outcomes
- **Continuous**: infinite set of possible outcomes
- **Probability Distributions**: a distribution over a set of a *single* random variable
- **Joint Probability Distributions**: a distribution over a set of  *multiple* random variables
- **Marginal Distributions**: A sub distribution of a joint distribution to a single variable.
	- Marginalization: Combining collapsed rows by adding.
- **Conditional Distributions**: probability distributions over some variables, given fixed values of others.
- U**niform Distribution**: all outcomes are equally probable: $P(x) = {1 \over |X|}$
- Two events are **independent** if knowing whether one event occurred doesn't change the probability of the other event.
- **Inference**: given a joint distribution, we can reason about unobserved variables given observations (evidence).
![[Screenshot 2025-02-09 at 2.50.41 PM.png|400]]
- **Conditional Independence**:
	- Correlated
	- $B\rightarrow A$ and $C$ : Confounder
	- If $A$ changes, $C$ is not likely to change
![[Screenshot 2025-02-09 at 2.55.20 PM.png|400]]
- **Conditional Dependence**:
	- $A$ and $C$ are independent
	- If $A$ changes, $C$ is likely to change (if we know the battery is fine the probability of being out of gas given the car does not start increases)
![[Screenshot 2025-02-09 at 2.56.12 PM.png|400]]
- **Correlation**: A relationship or connection between two things based on co-occurrence or pattern of change - a tendency for two variables to change together
	- If variables are correlated they are **NOT** independent
- **Statistical Correlation**: any statistical relationship, whether causal or not, between two random variables
	- Usually refers to the degree to which a pair of variables are *linearly* related
- **Causality**: Influence by which one event, process, state, or object (a cause) contributes to the production of another event, process, state, or object (an effect) where the cause is partly responsible for the effect, and the effect is partly dependent on the cause.
- Random Controlled Trial **RCT**: a group of subjects is randomly partitioned into the control group and a treatment group. (usually*double-blind* trials)
- **Confounding Factors**: Factors that can cause difficulty identifying causality
- **Correlation** helps with prediction; if X and Y are positively correlated, then observing high X means we should see high Y.
- **Causation**: needed for decision making; if X and Y are causally connected, then if I manipulate the value of X, keeping everything else constant, the value of Y will change. 
- **Confounder**: correlation is often due to confounding latent variable that is a hidden cause of both X and Y
- **Simpson's Paradox**: a phenomenon in probability and statistics, in which a trend appears in several different groups of data but disappears or reverses when these groups are combined. 
	- two variables may be positively associated in a population, but be independent or even negatively associated in all subpopulations.
	- Examples include epidemiology and studies of discrimination, where understanding the paradox is essential for drawing the correct conclusions from the data.
- **Selection Bias**: there are systematic differences between subsets of data, such that the subset is not representative of the overall population.
	- **Sampling Bias**: the non-random sampling of a population, e.g., the sample does not accurately represent the characteristics of the population from which it was drawn. 
	- **Exclusion Bias**:  the researcher intentionally removes some subgroups from the sample population. 
	- **Attrition Bias**: some research participants exit the study while it’s still ongoing.  If this happens differentially for different subpopulations, this affects the quality of the outcomes arrived at in the end. 
	- **Survivorship Bias**: the researcher screens subjects and chooses the ones who pass the screening process successfully.

![[Screenshot 2025-02-09 at 3.14.57 PM.png|400]]

**Equations:**
- Sum Rule: Given $P(X,Y) \rightarrow P(x) = \sum\limits_{y\in Y} P(x,y)$
- Product Rule: $P(x|y) = {P(x,y)\over P(y)} \leftrightarrow P(x,y) = P(x|y)P(y)$  
- Probability of a Disjunction (A or B): $P(A\cup B)=P(A)+P(B)-P(A\cap B)$
- Bayes' Rule: $P(x|y)= {P(y|x) \over P(u)} P(x)$
- Causal Inference: $P(c|e)= {P(e|c) P(c) \over P(e)}$ where $c$ = cause and $e$ = effect
- $E(X) = \sum\limits_{x\in X}P(x)*x$ 
- $E(X) = {1\over n} \sum\limits_{i=1}^n x_i$
- $Var(X) = {1\over n} \sum\limits_{i=1}^n (x_i - mean(x))^2$ 
- Counting *with* replacement: $n^k$ (choice of $n$ things $k$ times)
- Counting *without* replacement:
	- Order Matters: $_n P_k = {n! \over (n-k)!}$
	- Order Does not Matter: $_n C_k = {n! \over (n-k)!k!}$
- Independent Conditional Distribution: $P(X|Y) = P(X)$ and $P(Y|X) = P(Y)$
- Independent Joint Distribution: $P(X,Y) = P(X)P(Y)$
- Bayesian Reasoning for Hypothesis: $P(H|E) = {P(E|H)P(H)\over P(E)}$, where $E$ is data and $H$ is hypothesis
- Conditional Independence: $P(X|Y,Z)=P(X|Z)$ or $P((X\cap Y)|Z)=P(X|Z)*P(Y|Z)$

**Examples:**
- Layla is taking this quiz and doesn't know the solution to four of the multiple choice questions (each with three choices). If Layla randomly selects an answer, what is the probability that she gets all four questions right? $1/81$
- How many unique ways are there to arrange 3 characters from the word "CSE40"? $_6 P_3$
- Given $P(X|Z) = 0.4, P(Y|Z) = 0.2,$ and $P(X,Y|Z) = 0.08$ we cannot say anything about the independence of $X$ and $Y$

## M5/M6
**Challenges with data**
- Attribute value ambiguity (25%, 0.25, 25/100, etc. or brown, Brown, brownish), Name ambiguity, Data entry errors, Missing values, Changing attributes, Data formatting (dates), Abbreviations / data truncation

**Data Quality**
- Accurate, Complete, Consistent, Relevant, Valid, Timely, and Uniform.
We get high quality data by collecting it well to start and cleaning it after the fact

**Data Cleaning** - The process of identifying, deleting, and/or replacing inconsistent or incorrect information from the data. This technique ensures high quality of processed data and minimizes the risk of incorrect or inaccurate conclusions.

**Data cleaning process:**
**Eliminate duplicate / irrelevant / incorrect data**
- Duplicates from data entry errors / merging multiple data sources / attribute ambiguity
- Irrelevance from old data or data that only applies to another group
**Fix structural errors**
- When data is multi-relational, there are often structural inegrity constraints that must be checked. (students, majors, member-of: we want to ensure each student has at least one major)
**Handle missing data (Null, empty, or whitespace)**
- Assume functional form (ie linear). and use appropriate methods (ie linear regression)
- Drop data that has missing values or use interpolation (infer values using a classifier that predicts the values based on the values of other features)
- **Missing Data Mechanisms**
	- Missing Completely at Random (MCAR) - there is no relationship between the missingness of the data and any values, observed or missing
	- Missing at Random (MAR) - there is a _systematic_ relationship between the propensity of missing values and _observed_ data, but _not_ the missing data. (ie) if women are more likely to tell you their age than men, age is MAR
	- Missing Not at Random (MNAR) - there is a relationship between the propensity of a value to be missing and its value. (ie) people with lower education levels may be more likely to omit the education level field
**Identify and review outliers**
- **Outliers** - a value or point that differs substantially from the rest of the data
- **Domain Knowledge** (Sometimes the typical ranges of a value are known):
	- For example, when measuring blood pressure, a doctor likely  has a good idea of what is considered to be within the normal blood pressure range.
	- observations that fall outside the range may be worth investigation
- **Statistical Indicators** (we define outliers in reference to the data we're using)
	- Distance from the mean in standard deviations
	- Distance from the interquartile range by a multiple of the interquartile range
**Standardize and normalize data** - technique applied to change the values of numeric columns in the dataset to use a common scale
- Normalization: Rescale the range of values for a given feature into a set range, such as  \[0, 1\] or \[-1, 1\] (x' =   (x - min)  / (max - min))
- Standardization: rescale the range of values AND convert variance to a standard normal dist. with mean 0 and std 1.0
	- $x' = {(x-\mu)\over{\sigma}}$ 
**Re-represent data (feature engineering)**
- **Feature transformation** - a set of methods for transforming existing data into a new representation that will lead to more effective learning
	- text -> numeric (one-hot encoding)
	- numeric -> categorical (binning aka discretization)
		- Binning can reduce the effective dimensionality of learning by grouping together similar values. Some algorithms don't handle continuous / numeric data well (or at all)
		- Poor choices of bin boundaries can mask important differences
	- many categories -> fewer categories (grouping)
		- Methods: domain knowledge (genre, university type), clustering (co-clustering with class or other features), or wrapper methods (group, then learn, then regroup using feedback signal from learning)
- **Feature construction** - enriches data by adding derived features
	- mapping a feature into a new feature (using log functions) or creating a new feature from multiple features (using multiplication or addition)
- **Feature selection** - remove features from our data (identifying which variables are most relevant to the hypothesis)
	- Techniques: Manual Inspection or Automatic Techniques
		- Filter-based (use specific metric to filter features)
		- Wrapper-based: Treat the selection of set of features as a search problem
		- Embedded: Use a machine learning algorithm that has a built-in feature selection method
	- Leads to better, more efficient models
	- **The Pearson correlation coefficient** - the most common way of measuring a linear correlation (number between -1 and 1 that measures the strength and direction of the relationship)
	- **Chi-Squared Test** - used to determine if there is an association between _two categorical variables_ (does not work for continuous var)
		- Determines if there is a statistically significant relationship
**Math**
- These tools are essential for the basics of machine learning:
	- Linear regression - Summarize the relationship or “trend” between variables
	- Optimization - Find the best hypothesis in a space of possibilities
	- Gradient descent - Iteratively move towards better hypotheses / parameters

**Linear Algebra:** Model relationships between variables
- **vector norm**: a distance measure in a vector space that satisfies certain properties
	- useful for measuring the "size" of a vector and computing the distance between vectors
- L1-norm (Manhattan distance) is the sum of the absolute values of the individual feature values
- L2-norm (Euclidean distance) the square root of the sum of squares
- Dot product (scalar product) is a measure of how similar or aligned the vectors are

**Linear Regression** - mathematical way to draw a "trend" line through data in a scatter plot (line of best fit)
- we can use this line to make predictions in the data
- optimization of linear regression: find h such that $argmin_{h \in H} \sum\limits_{x_i} l(h(x_{i}),y_{i})$ where $h$ is a line
- L1 loss: the absolute value of the diff between the prediction $\hat{y_i}$ and the true label $y_i$ 
	- $|y_i - \hat y_i|$
- L2  : (mean-squared error (MSE)): $(y_i - \hat y_i)^2$ 
- Finding the best hypothesis (using linear algebra): $A^T Ax = A^T b$ (least squares solution of $Ax=b$)

**Calculus:** Model change in values over time or in relationship to other variables
- gradient: derivative of a multidimensional function
- capture the _local slope_ of the function, allowing predictions of taking a small step from a point in any direction
Convex function will have a single minimum (guaranteed)
- With gradients, if the derivative (in all directions) is zero,  we have found the minimum 

**Gradient Descent** (Most popular optimization alg)
- Important design choices: Initial value and learning rate
- Depending on where we start, we will follow a different path to reach the valley ($x_0$)
- Depending on the speed we might arrive at the valley in a different manner ($\alpha$)
- Gradient descent gives us:
	1. Direction of the slope
	2. Step size (how many unites to move in a particular direction)
		- $x_{n+1} = x_n - \alpha {d\over dx_n}f(x_n)$ where $x_{n+1}$ is the new position $x_n$ is old position, $\alpha$ is learning rate and ${d\over dx_n}f(x_n)$ is the gradient of function f for $\theta_n$ 
- Good step size converges quickly, large step size diverges, tiny step size converges slowly, large step size converges slowly, (fails for non-continuous functions)

## M7/M8
**Learning Techniques:**
- **Eager learning**: linear models, decision trees, neural networks
- **Lazy learning**: nearest neighbors
- **Decision Boundary**: Separates positive/negative regions in feature space
	- Helps us visualize how examples will be classified for the entire feature space
	- Helps us visualize the complexity of the learned model
- **Entropy**: Measures uncertainty in bits: $H(Y) = - \sum \limits_y p(Y=y)\log_2 p(Y=y)$
- **Parameters**: model weights, decision tree splits, etc
- **Hyper-parameters**: regularization, k, etc.

**Linear Models**
- Works when we are trying to predict continuous values
- The goal of learning is to find the best weight vector (best params $\theta$)
- Used for predicting continuous values and binary classification
- Cast learning as optimization problem
- Optimization: loss function (fit) + regularizer (simplicity)
	- Loss function: measures how well classifier fits training data
	- Regularizer: measures how simple the classifier is
- **Key functions**:
    - Sigmoid: $sigmoid(z) = {1\over 1+e^{-z}} \rightarrow [0,1]$
    - Linear regression: $y=mx+b$ (linear)
    - Logistic regression: $1\over{1+e^{-(mx+b)}}$ (curved)
- The weights and bias together are **parameters** of the model (often denoted as $\theta$)
- The magnitude and sign (negative/positive) of the weights shows importance and direction of influence of features
- **Generalized Linear Models**: $y = h(x) = f(w \cdot x)$ 
- **Weight vector**: $w = \{w_0,\dots,w_d\}$, a bias term $b$, and with feature vector $x = \{1, x_1,\dots,x_d\}$
- **Optimization**: $argmin_{\theta} L_{total}(X,Y,\theta) = \sum\limits_{x_i}l(f_\theta(x_i),y_i) + \alpha * R(\theta)$
- **Regularization**:
	- We can use **distance metrics** (AKA **norms**) to measure the effective size of the weight vector / parameters (Notation: $||w||$ or $||\theta||$)
    - $L_1$ norm: $||\theta||_1 = \sum_i |\theta_i| \rightarrow$ convex, smooth, easy to optimize
    - $L_2$ norm: $||\theta||_2 = \sqrt{\sum_i \theta_i^2} \rightarrow$ encourages sparse weight vectors, convex (not smooth at axis points)
- **Stochastic gradient descent** (SGD) is a simple, yet very efficient, variant of gradient descent used for fitting linear models. Efficient for large datasets, updates weights on small subsets. It chooses performs a gradient over subsets of data points instead of looking at them as a while

**Perceptrons**
- $f(x,w) = sign(w\cdot x)$ 
- Inputs are **feature vectors**, each feature has a **weight**, sum is the **activation**, add **bias term**, feature that is always $1$
- activation$_w(x) = \sum\limits_{i}w_i\cdot f_i(x)$ (scalars) $= w \cdot f(x)$ (vectors) where the result is either positive/negative $\rightarrow$ output is +/- $1$
- **Learning rule**: Update weights if classification is incorrect: $w = w + y \cdot f$
	- stopping early is good to avoid overfitting and simple modifications can dramatically improve performance (voting/averaging)
	- For each training instance - classify with current weights ($\hat y = 1$ if $w\cdot f(x) \geq 0$ else $\hat y = -1$), if correct ($\hat y = y$), no change!, if wrong, adjust the weight vector by adding or subtracting the feature vector. (subtract if y is -1)
	- ex: perceptron with $w = (1,2,-1)$ and input $(1,1,1)$ where the output was meant to be $-1$, whats the new weight vector? $w = w + y \cdot f = (1,2,-1) - 1 \cdot (1,1,1) = (0,1,-2)$
- **Properties**:
    - **Separability**: Can classify data if separable
    - **Convergence**: Stops updating once data is classified correctly

**Naive Bayes**
- Assumes feature independence given the class
- Design Decisions: representing probabilistic relationships for different kinds of features and smoothing (using prior probabilities) to avoid overfitting
- Uses Bayes' Rule for classification: $P(y|x)={P(y)\prod^n\limits_{i=1} P(x_i|y) \over P(x)}$
- Ex. Digit recognizer - probability that a number is displayed based on which pixels are filled

**Decision Trees**
- Non-linear, interpretable model with high variance
- Good splits create homogeneous subsets
- A good attribute splits the examples into subsets that are ideally "all positive" or "all negative"

**Nearest Neighbors**
- Easy to implement, but can be slow at deployment / classification time and can break down in very high-dimensional spaces
- Stores all training examples, classifies based on closest matches
- **Distance metrics**:
	- Determines the layout of the example space and helps measure similarity between instances
    - $L_1$ (Manhattan)
    - $L_2$ (Euclidean)
    - $L_\infty$ (Chebyshev / Max norm)
- **Hyperparameter k**:
	- Determines complexity and how large a neighborhood we should consider
    - Small $k$ → complex model
    - Large $k$ → smoother decision boundary
	- If $k=N$, the entire feature space is one neighborhood
- Epsilon ball NN
	- Instead of using $k$ nearest neighbors, use all examples $x'$ such that $distance(x,x') \leq \epsilon$ for some value $\epsilon$

**Neural Networks**
- Stacked perceptrons with non-linear activations
- Uses back-propagation for learning, forward-propagation for predictions
- Neural networks are made up of **nodes** or **units**, connected by **links**.
- Each link has an associated **weight** and **activation level**.
- Each node has an **input function** (typically summing over weighted inputs), an **activation function**, and an **output**.

```python
# create linear regression object
regr = LienarRegression()
# train the model using the training data
regr.fit(X_train, y_train)
# make predictions using the testing set
y_pred = regr.predict(X_test)
# scale data according to computed scaling
X = [[0, 15], [1, -10]]
StandardScalar().fit(X).transform(X)
# output: array([[-1., 1.], [1., -1.]])
```

```python
# X = np.arrange(10).reshape((5,2))
# array([[0,1], [2,3], [4,5], [6,7], [8,9]])
# y = [0,1,2,3,4]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=42)
# X_train: array([4,5],[0,1],[6,7]) | y_train: [2,0,3]
# X_test: array([2,3],[8,9]) | y_test: [1,4]
```

Pipelines:
- Transformers and estimators (predictors) can be combined into a single unifying object: a pipeline
- It can be fitted and used for prediction with fit and predict and helps prevent data leakage, ie, disclosing some testing data in your training data
```python
pipe = make_pipeline(StandardScaler(), LinearRegression())
pipe.fit(X_train, y_train)  # fit the whole pipeline
```

```python
df.loc[:, 'x2':'x4'] # Select all columns between x2 and x4 (inclusive). 
df.loc[df['a'] > 10, ['a', 'c']] # Select rows meeting logical condition, and only the specific columns
df.shape # Tuple of # of rows, # of columns in DataFrame.
df.describe # Basic descriptive and statistics (count/mean/std/min)
unique_data.info() # Shows columns Dtype and non-null count
df.dropna() # Drop rows with any column having NA/null data.
df.fillna(value) # Replace all NA/null data with value.
# drop columns
df.drop(columns=['col_02', 'col_05'], inplace=True)
# reset the index
df.reset_index(drop=True, inplace=True)
```