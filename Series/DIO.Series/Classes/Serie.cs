namespace DIO.Series
{
    public class Serie
    {
        // Attribs
        private int Id {get; set;}
        private int Year {get; set;}
        private Genre Genre {get; set;}
        private string Title {get; set;}
        private string Description {get; set;}
        private bool EntryActive {get; set;}
        
        // Methods
        public Serie(int id, int year, Genre genre, string title, string descript ) 
        {
            this.Id = id;
            this.Year = year;
            this.Genre = genre;
            this.Title = title;
            this.Description = descript;
            this.EntryActive = true;
        }

        public string getTitle(){
            return this.Title;
        }
        public int getID(){
            return this.Id;
        }
        public bool isActive(){
            return this.EntryActive;
        }
        public void hideEntry()
        {
            this.EntryActive = false;
        }
        // Overriding
        public override string ToString()
        {
            //Using Enviroment.Newline for easy cross-platform support
            string nl = Environment.NewLine;

            string concat = "Year: " + this.Year + nl; 
            concat += "Genre: " + this.Genre + nl;
            concat += "Title: " + this.Title + nl;
            concat += "Description " + this.Description + nl;

            return concat;
        }
    }
}