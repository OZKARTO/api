const express = require('express')
const routes = express.Router()


//-----------------get(listar)-------------
routes.get('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)    

        conn.query('SELECT * FROM series', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//---------------------- psot(agregar)-----------------------------

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO series set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('!Serie agregada!')
        })
    })
})

//-------------------delate(borrar)-------------------------

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM series WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('!Serie borrada!')
        })
    })
})

//---------------------------put(actualizar)--------------------------------------

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE series set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('!Serie actualizada!')
        })
    })
})

module.exports = routes