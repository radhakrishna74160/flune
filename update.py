import subprocess
import tkinter as tk
from tkinter import messagebox

def update_website():
    try:
        # Step 1: Add changes
        subprocess.run(["git", "add", "."], check=True)

        # Step 2: Commit changes
        subprocess.run(["git", "commit", "-m", "Auto update"], check=True)

        # Step 3: Push to GitHub
        subprocess.run(["git", "push", "origin", "main"], check=True)

        messagebox.showinfo("Success", "Website updated successfully on GitHub & Netlify!")

    except subprocess.CalledProcessError as e:
        messagebox.showerror("Error", f"Update failed:\n{e}")

# Create GUI
root = tk.Tk()
root.title("Flune Auto Updater")

btn = tk.Button(root, text="Update Website", font=("Arial", 14), command=update_website)
btn.pack(padx=20, pady=20)

root.mainloop()
