using System;
namespace DIO.Series
{
    public class App {

        static SeriesRepository SeriesRepo = new SeriesRepository();
        static Menu LandingMenu = new Menu();
    
        static void Main(string[] args)
        {
            Console.WriteLine("**************************************************************************************");	
            LandingMenu.showMainMenu();
            useMainMenu();
                       
        }

        // Gets user input to call an option from the menu
        private static void useMainMenu()
        {
            //Sentry variable cannot be initialized inside loop. Somehow.
            char userInput = '0';
            do
            {
                userInput = Char.ToUpper(Console.ReadKey().KeyChar);
                
                switch (userInput)
				{
					case '1':
						ListSeries();
                        LandingMenu.showMainMenu();
                        break;
					case '2':
						AddNewShow();
                        LandingMenu.showMainMenu();
                        break;
					case '3':
						//AtualizarSerie();
						break;
					case '4':
						//ExcluirSerie();
						break;
					case '5':
						//VisualizarSerie();
						break;
                    default:
                    	checkForBadInput(userInput);
                        break;
                }
         
            } while (userInput != 'X');
                                    
        }
        
        //Provides a "pause" between functions, lest the menu would render over the results.
        private static void pause(){
            Console.WriteLine("\nPress 'enter' to return.");
            Console.ReadLine();
        }
        private static void checkForBadInput(char input)
		{
            if (!"X12345".Contains(input)) 
                {
                // Bad input. Refresh menu and prompt the user to try again.
         
                Console.WriteLine("**************************************************************************************");	
		        Console.WriteLine("Invalid Command! Try again.");
		        Console.WriteLine("**************************************************************************************");
		        Console.Write("\n\nEnter a numeric option listed above: ");	 
                }
        }
        private static void ListSeries()
		{
            Console.Clear();
			Console.WriteLine("Registered shows: ");
            Console.WriteLine("**************************************************************************************");
			if (SeriesRepo.List().Count == 0)
			{
				Console.WriteLine("No shows in the entry :(");
                Console.WriteLine("How about adding some?\n\n");
                pause();
                return;
			}

			foreach (var show in SeriesRepo.List())
			{
                // Prints ID, Title and status of each registered show, even if deleted – a flag is added in this case.
				Console.WriteLine("#ID {0}: - {1} {2}", show.getID(), show.getTitle(), (!show.isActive() ? "*Excluído*" : ""));
			}
            pause();
		}
        private static void AddNewShow()
		{
			Console.WriteLine("\n\nRegistering a new show.");
            Console.WriteLine("**************************************************************************************");

			foreach (int i in Enum.GetValues(typeof(Genre)))
			{
				Console.WriteLine("{0}-{1}", i, Enum.GetName(typeof(Genre), i));
			}
			Console.Write("\nEnter the genre number from the options above: ");
			int genreInput = int.Parse(Console.ReadLine());

            //Displays selected genre to user for easy confirmation.
            Console.WriteLine("\nGenre selected: {0}", Enum.GetName(typeof(Genre), genreInput));

			Console.Write("Enter the show title: ");
			string titleInput = Console.ReadLine();

			Console.Write("Enter the show's debut year: ");
			int yearInput = int.Parse(Console.ReadLine());

			Console.Write("Enter a nice description: ");
			string descriptInput = Console.ReadLine();

			Serie newShow = new Serie(id: SeriesRepo.NextID(),
										genre: (Genre)genreInput,
										title: titleInput,
										year: yearInput,
										descript: descriptInput);

			SeriesRepo.Insert(newShow);
            Console.Write("\nNew show added.");	 
            pause();
		}



    }
}

