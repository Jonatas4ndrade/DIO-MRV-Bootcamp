using System;
using System.Globalization;
namespace DIO.Series
{
    public class Menu
    {
        // Gets current time
        DateTime CurrentTime = DateTime.Now;
        // Set target language below:
        CultureInfo TimeSettings = new CultureInfo("en-US");
        // Prints Main Menu
        public void showMainMenu()
        {
            // Screen always cleared before printing the menu.        
            Console.Clear();


            Console.WriteLine("                                     initialized {0}", CurrentTime.ToString("F",TimeSettings));

            Console.WriteLine("");
            Console.WriteLine("**************************************************************************************");
            Console.WriteLine("*________  .__           _________            .__                _________ .__  .__  *");
            Console.WriteLine("*\\______ \\ |__| ____    /   _____/ ___________|__| ____   ______ \\_   ___ \\|  | |__| *");
            Console.WriteLine("* |    |  \\|  |/  _ \\   \\_____  \\_/ __ \\_  __ \\  |/ __ \\ /  ___/ /    \\  \\/|  | |  | *");
            Console.WriteLine("* |    `   \\  (  <_> )  /        \\  ___/|  | \\/  \\  ___/ \\___ \\  \\     \\___|  |_|  | *");
            Console.WriteLine("*/_______  /__|\\____/  /_______  /\\___  >__|  |__|\\___  >____  >  \\______  /____/__| *");
            Console.WriteLine("*        \\/                    \\/     \\/              \\/     \\/          \\/          *");
            Console.WriteLine("======================================================================================\n");

            Console.WriteLine("+---------------------------------------------------+--------------------------------+");
            Console.WriteLine("|   Option    |            Description              |           Instructions         |");
            Console.WriteLine("+---------------------------------------------------+--------------------------------+");
            Console.WriteLine("|      1      |   List series in the entry.         | Type one of the listed options |");
            Console.WriteLine("|      2      |   Add a new show to the entry.      | to  navigate around  the menu. |");
            Console.WriteLine("|      3      |   Update an existing entry.         | Commands are not case sensiti_ |");
            Console.WriteLine("|      4      |   Delete a show from the selection. | ve.                            |");
            Console.WriteLine("|      5      |   Visualize a registered show.      |        We hope you will        |");
            Console.WriteLine("|      X      |   Exit :(                           |   enjoy our retro selection.   |");
            Console.WriteLine("+----------------------------------------------------+-------------------------------+\n");

            Console.Write("Option: ");
   		}
    }
}