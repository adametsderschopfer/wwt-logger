<h1>Logging in Node.js</h1>

<p>Example:</p>
<code>
const logger = new ILLog({
   path: "./",
   action: "NEW POST",
});
</code><p>or</p>
<code>const path = require("path")
  
const logger = new ILLog({
   path: path.join(__dirname),
   action: "NEW POST",
});
</code>
