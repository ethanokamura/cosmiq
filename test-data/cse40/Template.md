## Introduction: 
_The best reports include a hypothesis as to what the data represents and what trends you expect to find.  It's also important to tell us how you plan to approach this project._

Briefly describe the dataset you’re given and define the goal of the project and how you approach it. For example, you can present a basic introduction of your data (shape and proposed data types) and your goal is to use these features to predict the label of the response variable. Then you propose a few models that are suitable for this project which will be introduced in the modeling section

## Data Cleaning:
_The best reports not only say what you did during this step, but emphasize why you took each step, and what impact you expect it to have._

Describe the steps you took for data cleaning. 
- Why did you do this?
- Did you have to make some choices along the way? If so, describe them.

## Data Visualization: 
_The best reports pick visualizations that show obvious trends in the data.  We don't know what these will be for your problem, so you should spend some time making different visualizations to see which ones show potentially important trends worth sharing._

Create at least two different visualizations that help describe what you see in your dataset. Include these visualizations in your report along with descriptions of how you created the visualization, what data preparation you had to do for the visualization (aside from the data cleaning in the previous part), and what the visualization tells us about the data.

## Modelling:
_The best reports explain not just what models you used and their hyperparameters, but also why you chose those models and hyperparameters.  Additionally, models are expected to have accuracy scores roughly around 0.8-0.98.  If you get accuracy scores higher or lower than this, be sure to speculate as to why in the Analysis section_

Describe the classifiers you have chosen. Be sure to include all details about any parameter settings used for the algorithms. Compare the performance of your models using k-fold validation. You may look at accuracy, F1 or other measures. Then, briefly summarize your results.
- Are your results statistically significant?
- Is there a clear winner?
- What do the standard deviations look like, and what do they tell us about the different models? Include a table like Table 1. (See assignment.ipynb for details)

## Analysis:
_The questions given in the template are intentionally very broad.  The best reports ensure to tailor discussion of these questions towards relevant results you found in your modelling.  Also, be sure to actually do some analysis too - those questions aren't all-encompassing._

Now, take some time to go over your results for each classifier and try to make sense of them.
- Why do some classifiers work better than others?
- Would another evaluation metric work better than vanilla accuracy?
- Is there still a problem in the data that should fixed in data cleaning?
- Does the statistical significance between the different classifiers make sense?
- Are there parameters for the classifier that I can tweak to get better performance?

## Conclusion:
_Here's where you get to go into details about what you learned from this project.  The best reports also discuss what next steps you'd take to continue this project, and discuss what you think were the shortcomings of your approach._

Briefly summarize the important results and conclusions presented in the project. What are the important points illustrated by your work? Are there any areas for further investigation or improvement?
