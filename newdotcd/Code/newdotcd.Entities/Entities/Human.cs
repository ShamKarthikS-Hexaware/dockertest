using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace newdotcd.Entities.Entities
{
    [BsonIgnoreExtraElements]
    public class Human
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id  { get; set; }
        public string name  { get; set; }
        public string age  { get; set; }
        public string planet  { get; set; }
        
    }

}
