<h1>Logging in Node.js</h1>

<b>Example:</b>
<code>
const logger = new ILLog({
   path: "./",
   action: "NEW POST",
});
</code>
<p></p>
<b>or</b>
<code>const path = require("path")
  
const logger = new ILLog({
   path: path.join(__dirname),
   action: "NEW POST",
});
</code>
