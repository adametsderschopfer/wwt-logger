<h1>Logging in Node.js</h1>
<p><b>Example:</b></p>

<code>
const logger = new ILLog({
   path: "./",
   action: "NEW POST",
});
</code>
<p></p>
<p><b>or</b></p>
<code>
const path = require("path")
  
const logger = new ILLog({
   path: path.join(__dirname),
   action: "NEW POST",
});
</code>
