# DeepSea

https://deepsea.poesy.run/

[日本語版 README](./README_ja.md)

## About

This work explores a short poem written in JavaScript through the act of testing. Testing is a crucial process in software development, and various tools have been developed to verify the execution results of code. This work incorporates Mocha, a JavaScript testing framework, and repeatedly tests the code in the browser.

At the center of the work is a class called "DeepSea." This class has a recursive constructor that, when instantiated, stores another instance in its internal variable "mystery." In most cases, this instance is another instance of the same "DeepSea" class, but when diving deep enough, there is a small probability that an instance of an ancient fish will be stored instead.

I consider this kind of structure to be a unique value of programming languages. Even without visualization, I believe this structure itself can be called generative art. The testing framework provides a means to unravel and share its internal state. This reveals the gap between expectation and reality, reminding us of the historical event that ancient fish are still alive. I hope this work will serve as an opportunity to think about the relationship between testing and code-based art.

## Statement

A test suite runs against a recursive poem. Each line asserts non-encounter. Failure is not a defect; it registers that something has already occurred beyond verification's reach.

## Files

- index.html
- style.css
- testDeepSea.js
- mocha.js (external library)
- mocha.css (external library)

## Movie

The `movie/` folder contains an HTML file for recording a 3-minute video of the work.

## Other Versions

- DeepSea code poem in Ruby: https://x.com/arandoros/status/1750138630222606820
- DeepSea code poem in Cadence: https://x.com/arandoros/status/1750161046571020299
    - Execution result: https://x.com/arandoros/status/1750161049158869383

## License

This work is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).
You are free to share and adapt this work as long as you give appropriate credit to the original author.
For more details, please see [here](https://creativecommons.org/licenses/by/4.0/).
