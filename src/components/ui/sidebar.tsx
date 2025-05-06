
import * as React from "react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface SidebarProviderProps {
  children: React.ReactNode
}

interface SidebarContextType {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="min-h-screen flex w-full">
        {children}
      </div>
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const { isOpen } = useSidebar()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-20 flex h-full w-60 flex-col bg-white shadow-md transition-transform duration-300 ease-in-out",
        !isOpen && "-translate-x-full",
        className
      )}
      {...props}
    />
  )
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn("flex h-16 items-center border-b px-4", className)}
      {...props}
    />
  )
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn("flex-1 overflow-auto p-4", className)}
      {...props}
    />
  )
}

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return (
    <div
      className={cn("border-t p-4", className)}
      {...props}
    />
  )
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroup({ className, ...props }: SidebarGroupProps) {
  return (
    <div
      className={cn("mb-4", className)}
      {...props}
    />
  )
}

interface SidebarGroupLabelProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupLabel({ className, ...props }: SidebarGroupLabelProps) {
  return (
    <div
      className={cn("mb-2 text-xs font-medium text-muted-foreground", className)}
      {...props}
    />
  )
}

interface SidebarGroupContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarGroupContent({ className, ...props }: SidebarGroupContentProps) {
  return (
    <div
      className={cn("space-y-1", className)}
      {...props}
    />
  )
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return (
    <div
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive?: boolean
}

export function SidebarMenuItem({ className, isActive, ...props }: SidebarMenuItemProps) {
  return (
    <div
      className={cn(className)}
      {...props}
    />
  )
}

interface SidebarMenuButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  asChild?: boolean
}

export function SidebarMenuButton({ className, isActive, asChild = false, ...props }: SidebarMenuButtonProps) {
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "w-full justify-start text-muted-foreground font-normal",
        isActive && "bg-muted text-foreground font-medium",
        className
      )}
      {...props}
    />
  )
}

interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export function SidebarTrigger({ className, asChild = false, ...props }: SidebarTriggerProps) {
  const { isOpen, setIsOpen } = useSidebar()
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "fixed top-4 left-4 z-30",
        isOpen && "left-64",
        className
      )}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M9 3v18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </Comp>
  )
}
