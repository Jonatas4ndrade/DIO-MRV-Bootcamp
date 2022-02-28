using System;
namespace DIO.Series
{
    public class App {

        static SeriesRepository SeriesRepo = new SeriesRepository();
        static Menu LandingMenu = new Menu();
    
        static void Main(string[] args)
        {
            LandingMenu.showMainMenu();
            useMainMenu();
                       
        }

        // Gets user input to call an option from the menu
        private static void useMainMenu()
        {
            char userInput = Char.ToUpper(Console.ReadKey().KeyChar);
            do 
            {  
                switch (userInput)
				{
					case '1':
						ListSeries();
						break;
					case '2':
						AddNewShow();
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
						if (userInput != 'X') 
                        {
                            // Bad input. Refresh menu and prompt the user to try again.
                            LandingMenu.showMainMenu();

                            Console.WriteLine("**************************************************************************************");	
		                    Console.WriteLine("Invalid Command! Try again.");
		                    Console.WriteLine("**************************************************************************************");
		                    Console.Write("\n\nEnter a numeric option listed above: ");	 
                        }
                        break;
                }
            } while (userInput != 'X');
                                    
        }
        private static void ListSeries()
		{
			Console.WriteLine("Registered shows:");
            Console.WriteLine("**************************************************************************************");
			if (SeriesRepo.List().Count == 0)
			{
				Console.WriteLine("No shows in the entry :(");
                Console.WriteLine("How about adding some?\n\n");

                Console.WriteLine("Press 'enter' to return.");
                Console.ReadLine();
				return;
			}

			foreach (var show in SeriesRepo.List())
			{
                // Prints ID, Title and status of each registered show, even if deleted – a flag is added in this case.
				Console.WriteLine("#ID {0}: - {1} {2}", show.getID(), show.getTitle(), (show.getStatus() ? "*Excluído*" : ""));
			}
		}
        private static void AddNewShow()
		{
			Console.WriteLine("Registering a new show.");
            Console.WriteLine("**************************************************************************************");

			foreach (int i in Enum.GetValues(typeof(Genre)))
			{
				Console.WriteLine("{0}-{1}", i, Enum.GetName(typeof(Genre), i));
			}
			Console.Write("Enter the genre number from the options above: ");
			int genreInput = int.Parse(Console.ReadLine());

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
		}



    }
}

