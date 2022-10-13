---
title: "Python (Pandas)"
toc: true
category: Tech
---

## Read CSV

```python
pd.read_csv('/tmp/1.csv')
```

## Select rows

```python
# Exact match for a single value
df[df["country"] == "SG"]

# Match against multiple values
df[df["country"].isin(["SG", "ID", "PH", "TW", "HK", "MY"])]

# Multiple conditions
df.loc[df["country"] == "SG" | df["country"] == "MY"]
```

## Group by

```python
# Single key
df.groupby(by='platform')

# Multiple keys
df.groupby(by=['platform', 'country'])
```

## Find averages

```python
df.groupby(by='platform')[["platform", "response_time"]].mean()
```

## Find percentiles

```python
df.groupby(by="platform")['response_time'].quantile([0.05, 0.25, 0.5, 0.75, 0.9, 0.95]).unstack()
```

## Plot histogram

```python
bins = range(0, 500, 10)
df["response_time"].plot.hist(bins=bins)
```
