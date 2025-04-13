# HO5 Analysis
Written by Ethan Okamura

## Introduction: 
For this project, I have been given a dataset with unknown features containing a mix of `int`, `float`, and `str` types. The dataset includes a `label` column, which serves as the response variable, but all other columns lack defined names, content descriptions, or expected data types. The goal of this project is to clean, explore, and model the data to uncover meaningful patterns and train classifiers for prediction.

My approach consists of the following key steps:

1. **Data Cleaning & Preprocessing** – Identify and handle inconsistencies in data types, missing values, and potential outliers. Encoding categorical variables and normalizing numerical values will also be necessary.
2. **Data Exploration & Visualization** – Analyze the dataset using statistical summaries, visualizations, and correlation matrices to gain insights into potential relationships between features and the `label` column.
3. **Modeling & Evaluation** – Train multiple machine learning models, such as linear regression, perceptrons, and k-nearest neighbors, to determine which approach yields the best classification performance. Model selection will be based on accuracy and precision.

A major challenge of this project is working with completely unknown data, making it difficult to form an initial hypothesis about what the features represent. However, I expect to uncover trends through exploratory analysis and feature engineering. Given that real-world datasets often come with minimal documentation, this project presents a realistic and valuable learning opportunity. My primary objective is to develop an effective strategy for working with raw, unstructured data and improve my ability to preprocess and interpret ambiguous datasets.

## Data Cleaning:
#### Understanding the Data Structure:
Before cleaning the dataset, I first needed to understand its structure. Unlike previous projects where I worked with structured `.json` or `.csv` files, this dataset was significantly more unstructured, making manual inspection difficult. To address this, I wrote a Python script to convert the raw text file into a structured JSON format. Initially, I structured the data by rows, but I found it challenging to analyze individual features across all rows.

To improve readability and analysis, I restructured the JSON file so that each column contained a list of all values for that specific feature:
```json
"column_name_1": [
	"data from column 1, row 1",
	"data from column 1, row 2",
	"data from column 1, row 3",
],
"column_name_2": [
	...
]
```

This transformation allowed me to quickly scan values within a column, detect patterns, and identify inconsistencies. Although this required extra effort upfront, it paid off in the long run.

With this in place, I tried to analyze outliers as well as potential commonalities with `NULL` values. For my dataset, I came to the following conclusions:
1. `NULL` values were described with: `''`, `'None'`, `'none'`, `'N/A'`, `'n/a'`, `'?'`, `'NULL'`
2. `col_02` and `col_05` contained the same values.
3. `col_03` contained comma separated lists of strings
4. The other columns either contained numeric values of type `int` or `float`

#### Handling Missing Values:
One of the first patterns I noticed was the inconsistent representation of missing values. The dataset contained multiple placeholders for missing data, including `''`, `'None'`, `'none'`, `'N/A'`, `'n/a'`, `'?'`, and `'NULL'`. To ensure consistency, I replaced all these variations inside my cleaning function with `numpy.nan`, allowing for easier filtering and analysis.

```python
empty_list = ['', 'None', 'none', 'N/A', 'n/a', '?', 'NULL']
```

#### Handling Duplicates:
I observed that `col_02` and `col_05` contained identical data. To simplify the dataset and reduce redundancy, I merged these columns into a single feature, which I labeled `'sports'`. This decision aimed to improve clarity while reducing unnecessary complexity in the modeling stage.

#### Handling Categorical Variables:
Another challenge was dealing with categorical data. `col_03` and now `sports` contained comma-separated lists of strings, indicating multiple categorical labels within a single column. To prepare this for machine learning models, I used one-hot encoding, transforming each unique category into its own binary column. This allowed the dataset to remain purely numeric while preserving categorical distinctions.

I deliberately postponed this step until after the initial data analysis to keep the dataset readable while identifying trends with different diagrams. Once I was ready to train models, converting categorical data into a numerical format became essential for efficient processing.

## Data Visualization: 
My first attempt at visualizing the data was to start with histograms. However, I immediately ran into the issue that the different data types would not be able to be displayed in the same way. To fix this, I broke down them by categories: strings and numbers. I decided to first use the regular line chart for the numeric values and a bar chart for strings. On my first attempt, both charts were unhelpful and difficult to interpret. I did quite a bit of tinkering before finding a better solution. 

#### Non-Numeric Data
After creating a few variations of feature frequency tables, I found one chart that was most helpful. It displays the relationship between the feature and the frequency of a label. For example, the most common label for entries with cats was 5. Attached below this is an image of this chart:

![[Pasted image 20250312123639.png | 300]]

I achieved this by grouping the data by label and normalizing the data such that it was in the rage of `[0,100]`, where 100 signified that the 100% of the time the feature appeared it also had the given label. However, this pointed out a new issue. Looking at label 5 specifically, there were 4 different animals where label 5 the most common label.

To get a better look, I wanted to breakdown the percentage of animals for each label. To do this, I figured a pie chart was best. My goal was to see the breakdown of different animals for each label.

This proved to be a great way of visualizing the animals columns. Here's an example of how that looks (I used explode to separate the largest piece of the pie).

![[Pasted image 20250312130857.png| 300]]

The distribution for column 3 was as follows:

| Label | Animal |
| ----- | ------ |
| 0     | rat    |
| 1     | ferret |
| 2     | dog    |
| 3     | rabbit |
| 4     | bird   |
| 5     | pig    |

From here, I wanted to test if this method of visualization was best for other columns. While I was doing this, I realized both columns 2 and 5 were sports / hobby related. So, using the knowledge I have gained from previous experimentation, I joined the columns together, combining the rows into lists. I stored this in a column called `"sports"`.

Similarly, this seemed to provide a great visual:

![[Pasted image 20250312131326.png | 300]]

Here's the table breaking it down:

| Label | Animal          |
| ----- | --------------- |
| 0     | Track and Field |
| 1     | Soccer          |
| 2     | Gold            |
| 3     | Baseball        |
| 4     | Boxing          |
| 5     | Running         |

#### Numeric Data

Just as I thought I was on to something, I tried it with one of the numbered columns. Which this, in fact, did not work.

![[Pasted image 20250312131619.png | 300]]

This meant that the current pie chart was great for features with features that were strings, but something as precise as numbers would not cut it. To fix this, I could either use bins or find a new way to display the data. To keep the integrity of the data, I decided not to bin.

In the end, I resulted to displaying the mean values for each label given a column. Along with the graph, I output which label contained the min and max value and the ordered list (largest to smallest). Off first impression, I found that the biggest difference between the graphs were the minimum values. Typically the maximum values were about the same as some of the other labels.

![[Screenshot 2025-03-12 at 3.08.55 PM.png | 300]]

| Column | Max     | Min    | Order            |
| ------ | ------- | ------ | ---------------- |
| 0      | 988.73  | 379.32 | 1, 5, 3, 4, 0, 2 |
| 1      | 0.96    | 0.16   | 4, 0, 3, 2, 5, 1 |
| 4      | 1026.86 | 59.69  | 4, 3, 0, 2, 1, 5 |
| 6      | 0.99    | 0.18   | 5, 3, 4, 2, 0, 1 |
| 7      | 1.04    | 0.18   | 3, 4, 2, 0, 5, 1 |
| 8      | 1040.17 | 162.82 | 2, 1, 4, 5, 3, 0 |
| 9      | 0.97    | 0.07   | 1, 3, 0, 4, 2, 5 |
| 10     | 1055.04 | 403.46 | 0, 1, 3, 2, 4, 5 |
| 11     | 1029.38 | 436.89 | 1, 5, 3, 4, 0, 2 |

It was at this point that I felt as though I had a decent visual for the data, allowing me to see certain trends within the dataset. Though, it might not make sense to me as a whole, the visuals definitely made it easier to interpret the bulk of the data.

## Modeling:

To ensure optimal performance, I ran several tests to tune hyperparameters for each classifier.
### Hyperparameter Tuning:
The hyperparameters are not a one size fits all, to combat this, I ran a series of tests lightly discussed in my modeling section. The key things I tested for with the models were the value of $n$ and the distance equation `p` for k-nearest neighbors, different types of penalties ($L_1, L_2, \text{elasticnet}$) for the perceptron, and finally different types of solvers for the Linear Regression classifier.
#### k-Nearest Neighbors (k-NN):
I tested various values of `k` to determine the best choice using cross-validation. The following loop tested values of `k` from 1 to 200:

```python
for i in range(1,20):
	for p in range(1,3):
		scores = cross_fold_validation(sklearn.neighbors.KNeighborsClassifier(n_neighbors=i, p=p), unique_data, 5)
		mean = numpy.mean(scores)
		if mean > 0.979:
			print("Score: " + str(mean) + " with n = " + str(i) + " and p = " + str(p))
			print("std: " + str(numpy.std(scores)))
```

The highest accuracy was found at `k = 1` and `p = 1`:

```
Score: 0.9809553700332685 with n = 1 and p = 1
```

This suggests that each data point is quite distinct from others, making `k = 1` a reasonable choice. However, a low `k` can lead to overfitting, which might explain the slightly lower mean accuracy compared to other models.

#### Perceptron:
For the Perceptron model, I tested different regularization techniques to prevent overfitting. The best result was obtained with L2 regularization:

```python
print('Testing Perceptron')
penalties = ['l2', 'l1', 'elasticnet']
for test in penalties:
	scores = cross_fold_validation(sklearn.linear_model.Perceptron(penalty=test), unique_data, 5)
	mean = numpy.mean(scores)
	if mean > 0.988:
		print("Score: " + str(mean) + " with penalty " + test)
		print("std: " + str(numpy.std(scores)))
```

```
Score: 0.9887954302931391 with penalty l2
```

I also tested different L1 ratios, but no significant improvement was observed.

#### Logistic Regression:
When playing around with different solvers for Logistic Regression, I could not find one that was more efficient than the default solver.

```python
solvers = ['lbfgs', 'liblinear', 'newton-cg', 'newton-cholesky', 'sag', 'saga']
for test in solvers:
	scores = cross_fold_validation(sklearn.linear_model.LogisticRegression(solver=test), unique_data, 5)
	mean = numpy.mean(scores)
	if mean > 0.991:
		print("Score: " + str(mean) + " with penalty " + test)
		print("std: " + str(numpy.std(scores)))
```
### Final Classifiers:
The final classifiers used were:

```python
def create_classifiers():
    return [
        sklearn.linear_model.LogisticRegression(),		
        sklearn.linear_model.Perceptron(penalty='l2'),
        sklearn.neighbors.KNeighborsClassifier(n_neighbors=1)
    ]
```

### Model Performance:
Using k-fold cross-validation, I evaluated the models and obtained the following results:

|Model|Mean Accuracy|Standard Deviation of Accuracy|
|---|---|---|
|Logistic Regression|0.991|0.007|
|Perceptron|0.990|0.004|
|K-Nearest Neighbor|0.981|0.006|

### Statistical Significance:
To compare models, I performed statistical tests to check if differences were significant:

```
LogisticRegression vs Perceptron: False
LogisticRegression vs KNeighborsClassifier: True
Perceptron vs KNeighborsClassifier: True
```

This means:
- Logistic Regression and Perceptron performed similarly, with no statistically significant difference. This suggests the dataset is likely **linearly separable**, meaning a simple linear decision boundary is sufficient.
- k-NN performed slightly worse than both linear models, with a statistically significant difference. This could be due to its sensitivity to noise or potential overfitting at `k=1`.

The results indicate that Logistic Regression and Perceptron are the best models for this dataset due to their high accuracy and minimal variance. Since k-NN showed a lower performance, it suggests that a linear model is a more suitable approach for this classification task. Given the standard deviations, all models are relatively stable, but Perceptron had the lowest variation, suggesting consistent performance across different validation folds.

## Analysis:
Different classifiers perform better depending on the structure and properties of the dataset. Since I was unable to easily interpret the underlying patterns in the data, I decided to test both linear and non-linear models to determine which class of models would be more effective. The results indicate that the dataset follows a slightly more linear trend, as evidenced by the fact that the linear models (Logistic Regression and Perceptron) outperformed the non-linear K-Nearest Neighbors (k-NN) classifier.

Additionally, the linear models exhibited lower standard deviations compared to k-NN, suggesting that they provided more stable and consistent predictions across different folds of cross-validation. This conclusion is further reinforced by the results of the statistical significance tests: while there was no significant difference between the two linear classifiers, both showed a statistically significant improvement over k-NN. This strongly suggests that the data is largely linearly separable.

Breaking down the model performances:
- **Logistic Regression** performed the best overall, likely due to its gradient-based learning and ability to provide probabilistic outputs, making it a more stable and flexible linear classifier.
- **Perceptron** performed nearly as well, but as a simpler model, it lacks the probabilistic framework of logistic regression, which might explain its slightly lower performance and marginally higher standard deviation.
- **k-NN** had the lowest accuracy and a slightly higher standard deviation, which aligns with expectations given that k-NN can struggle with high-dimensional data and may be sensitive to variations in the dataset

Regarding evaluation metrics, while accuracy provided a useful benchmark, it might not fully capture the model’s performance in cases where the dataset is imbalanced.

There do not appear to be significant issues with data cleaning, although some ambiguity remains in certain columns. A deeper understanding of the dataset’s structure could allow for feature engineering improvements, potentially boosting model performance further. Hyperparameter tuning beyond basic adjustments (e.g., testing different solvers for logistic regression, adjusting learning rates for perceptron, or using different distance metrics for k-NN) could also help refine results.

## Conclusion:
This project reinforced the importance of not only model selection but also careful **data preprocessing and analysis**. While at first glance, the dataset appeared to lack clear patterns, deeper exploration revealed underlying trends that influenced classifier performance. The results suggest that the data is largely **linearly separable**, making linear models the best choice for classification.

One key takeaway was the importance of model evaluation beyond accuracy—exploring standard deviations and statistical significance provided a deeper understanding of classifier reliability. Additionally, testing multiple model types (linear vs. non-linear) without initial assumptions helped eliminate bias and allowed for data-driven conclusions.

Overall, this project was a valuable learning experience in practical machine learning workflow, reinforcing the necessity of data exploration, model evaluation, and iterative experimentation in building classification models.

<div style="page-break-after: always;"></div>

# Extra Credit:
In this section, I will re-examine the classification process using a dataset I created. This dataset is designed to predict a programming language based on key syntactic features. Beyond this project, I am interested in developing an AI assistant that can assist in writing documentation and README files using project context. A crucial aspect of this assistant would be its ability to detect the programming language used, enabling more accurate descriptions of methods, syntax, and logic.

### Dataset Structure:
- **Label**:
    - `lang`: The known programming language (`0`: C, `1`: C++, `2`: Python)
- **Features**:
    - `semicolons`: Integer count of semicolons in a file
    - `brackets`: Integer count of brackets in a file
    - `keywords`: Space-separated list of language-specific keywords found in a file

Example data:

```csv
lang,semicolons,brackets,keywords
2,0,0,if
1,452,62,cout delete new
1,131,58,string operator & delete
2,0,0,in else str for lambda print
2,0,0,in else if and def
0,474,172,double printf
```

To generate this dataset, I wrote a Python program that randomly creates a `.csv` file of a given length (number of rows). This allows me to easily generate multiple datasets and modify values, such as introducing missing data for testing robustness.

I chose to create my own dataset because I wanted to practice dataset design and feature selection. The features I included are based on heuristics that I believe are strong indicators of a given language. I was inspired by VS Code’s ability to detect languages even when a file lacks an extension. While my dataset lacks the complexity required for real-world applications, it serves as an effective proof of concept. Notably, distinguishing between C and C++ presents a challenge, as C++ code can often be classified as C, but not vice versa. The subtle yet crucial differences between them make this a meaningful test case.

### Data Cleaning:
Cleaning this dataset would be straightforward:
- `lang`, `semicolons`, and `brackets` are integer values.
- `keywords` is a space-separated string list, which could be converted into a numerical format using one-hot encoding.

This process ensures that the data is entirely numeric, making it suitable for model training, analysis, and validation.

### Data Visualization:
For visualization, a tree diagram would be an effective way to represent decision-making based on features. A simple table displaying the language label, presence of semicolons and brackets as Boolean values, and a list of detected keywords would also be useful.

### Modeling Approach:
Given the structure of this dataset, a **decision tree** would be an ideal classifier. The data lends itself to a rule-based split, making decision trees both interpretable and efficient. A simplified classification process could look like this:
1. **Check for semicolons or brackets:**
    - If absent → Python (Python does not require semicolons or brackets)
    - If present → Proceed to the next step
2. **Check for C++-specific keywords:**
    - If present → C++
    - If absent → C

### Analysis:

While this is a highly simplified version of a more complex problem, it represents an important real-world application. Predicting file types or languages for personalized, refined support is highly relevant in modern software development. If I were to pursue the AI assistant concept, language detection would be a critical first step.

Although I did not train the models, this thought experiment has reinforced my understanding of dataset creation, preprocessing, and classification strategies. It has also motivated me to further explore real-world applications using larger, more dynamic datasets.

I am excited to continue this research and apply these principles to more complex and scalable datasets in the future.

<div style="page-break-after: always;"></div>

## References

[1] Wikipedia contributors. (n.d.). _Student's t-test_. Wikipedia, The Free Encyclopedia. Retrieved from [https://en.wikipedia.org/wiki/Student%27s_t-test](https://en.wikipedia.org/wiki/Student%27s_t-test)

[2] SciPy Developers. (n.d.). _scipy.stats.ttest_ind_. SciPy Documentation. Retrieved from [https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html)

[3] W3Schools. (n.d.). _Matplotlib tutorial_. Retrieved from [https://www.w3schools.com/python/](https://www.w3schools.com/python/)

[4] Pandas Developers. (n.d.). _Pandas reference documentation_. Retrieved from [https://pandas.pydata.org/docs/reference/index.html](https://pandas.pydata.org/docs/reference/index.html)

[5] Scikit-learn Developers. (n.d.). _Scikit-learn API documentation_. Retrieved from [https://scikit-learn.org/stable/api/index.html](https://scikit-learn.org/stable/api/index.html)