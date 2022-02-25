using System;
using DIO.Series.Interfaces;

namespace DIO.Series
{
    public class SeriesRepository : IRepository<Serie>
    {
        // Attribs
        private List<Serie> seriesRoll = new List<Serie>();
        
        // Methods
        public List<Serie> List()
        {
            return seriesRoll;
        }
        public Serie ReturnByID(int id)
        {
            return seriesRoll[id];
        }
        public int NextID()
        {
            return seriesRoll.Count;
        }    
            // CRUD
        public void Insert(Serie entity)
        {
            seriesRoll.Add(entity);
        }
        public void Delete(int id)
        {
            seriesRoll[id].hideEntry();
        }
        public void Update(int id, Serie entry)
        {
            seriesRoll[id] = entry;
        }
    }
}