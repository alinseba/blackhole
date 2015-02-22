## monitor.rb
## Monitors files for changes and runs command on change.

# This is the command to run when a file changes. Variables:
# * file: The full file name, path and extension of the changed file.
# * file_name: The name and path of the changed file (no extension).
# * file_extension: The extension of the changed file.
Command = "sass file file_name.css --style expanded"

# This is the extension of files to watch for changes.
# Asterisk means to watch all files.
Extension = "scss"

# If you use HSS, use the following configuration:
# * Command = "hss file"
# * Extension = "hss"

###################################################################


# The Monitor finds all files to observe,
# and waits for changes to these files.
class Monitor
  attr_reader :files
  
  def initialize
    @files = []
    Dir["**/*.#{Extension}"].each do |file|
      files << SourceFile.new(file, Command)
      files.last.run_command
    end
  end

  def observe
    puts "=> Observing..."
    loop do
      sleep 1
      changed_file = @files.find { |file| file.changed? }
      changed_file.run_command if changed_file
    end
  end
end

# The SourceFile class can check if a file has changed,
# and determine the correct command for the file.
class SourceFile
  attr_reader :file, :last_changed, :cmd
  
  def initialize(file, cmd)
    @file = file
    @last_changed = File.mtime(file)
    @cmd = set_command(cmd)
  end
  
  def changed?
    if File.mtime(@file) > @last_changed
      @last_changed = File.mtime(@file) 
    end
  end

  def set_command(cmd)
    cmd = cmd.gsub("file_extension", file.split('.')[1])
    cmd = cmd.gsub("file_name", file.split('.')[0])
    cmd = cmd.gsub("file", file)
  end
  
  def run_command
    puts "=> Running: #{@cmd}"
    system(@cmd)
  end
end

# Start observing files
Monitor.new.observe
