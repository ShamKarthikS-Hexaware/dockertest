using newdotcd.Data.Interfaces;
using newdotcd.Entities.Entities;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Core.Bindings;
using System;
using System.Collections.Generic;
using System.Text;

namespace newdotcd.Data.Repositories
{
    public class HumanRepository : IHumanRepository
    {
        private IGateway _gateway;
        private string _collectionName = "Human";

        public HumanRepository(IGateway gateway)
        {
            _gateway = gateway;
        }
        public IEnumerable<Human> GetAll()
        {
            var result = _gateway.GetMongoDB().GetCollection<Human>(_collectionName)
                            .Find(new BsonDocument())
                            .ToList();
            return result;
        }

        public bool Save(Human entity)
        {
            _gateway.GetMongoDB().GetCollection<Human>(_collectionName)
                .InsertOne(entity);
            return true;
        }

        public Human Update(string id, Human entity)
        {
            var update = Builders<Human>.Update
                .Set(e => e.name, entity.name )
                .Set(e => e.age, entity.age )
                .Set(e => e.planet, entity.planet );

            var result = _gateway.GetMongoDB().GetCollection<Human>(_collectionName)
                .FindOneAndUpdate(e => e.Id == id, update);
            return result;
        }

        public bool Delete(string id)
        {
            var result = _gateway.GetMongoDB().GetCollection<Human>(_collectionName)
                         .DeleteOne(e => e.Id == id);
            return result.IsAcknowledged;
        }
    }
}
