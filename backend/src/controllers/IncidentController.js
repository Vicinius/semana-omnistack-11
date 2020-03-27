const connection = require('../database/connection');

module.exports = {

    async index (request,response){
        
        const {page=1} = request.query; 

        const [count] = await connection('incidents').count();
        console.log(count);

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(4)
        .offset((page-1)*4)
        .select([
             'incidents.*',
             'ongs.name',
             'ongs.email',
             'ongs.whatsapp',
             'ongs.city',
             'ongs.uf'
            ]);

        response.header('Quantos-incidents', count['count(*)']);
        // pages=(count['count(*)'])/4;
        // pagesup=Math.ceil(pages);
        // response.header('Quantas-pages', pagesup);

        // sodre=Math.PI;
        // console.log(sodre);
                
        return response.json(incidents);

    },

    async create(request,response) {

        const{ title,description,value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
                
        return response.json({ id });

    },

    async delete(request, response){

        const {id} = request.params;
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

            if(incidents.ong_id != ong_id) {
                return response.status(401).json({error: 'Operation not valid'});
            }
            
            await connection('incidents').where('id', id).delete();

            return response.status(204).send();
        
    },
};