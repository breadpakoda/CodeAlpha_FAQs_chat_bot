const express = require("express")
const cors= require("cors")
const http = require("http")

const app= express()
app.use(cors())
app.use(express.json())

app.post('/query', (req,res)=>{
    
    
    const data = JSON.stringify(req.body)
    
    const options = {
        hostname: 'localhost',
        port: 8000,
        path: '/query',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data)
        }
    }
    
    const pythonReq = http.request(options, (pythonRes) => {
        let responseData = ''
        
        pythonRes.on('data', (chunk) => {
            responseData += chunk
        })
        
        pythonRes.on('end', () => {
          
            try {
                const parsedData = JSON.parse(responseData)
                
                res.json(parsedData)
            } catch (e) {
                console.error("Error parsing Python response:", e.message)
                res.status(500).json({ error: "Invalid response from Python: " + responseData })
            }
        })
    })
    
    pythonReq.on('error', (error) => {
        console.error("Error:", error.message)
        res.status(500).json({ error: error.message })
    })
    
    pythonReq.write(data)
    pythonReq.end()
})

app.listen(3000,()=>{
    console.log("Server started on port 3000...")
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err)
})